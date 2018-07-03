import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid, mail} from '../utility';

export default class extends Base {
    public async create(type, param): Promise<boolean> {
        const {
            comment, createdAt, createdBy, id
        } = param

        const db_commentable = this.getDBModel(type)
        const commentable = await db_commentable.getDBInstance().findOne({_id: id})
            .populate('createdBy')

        if (commentable) {
            if (type === 'Task') {
                if (_.includes([ constant.TASK_STATUS.CREATED, constant.TASK_STATUS.PENDING ], commentable.status) &&
                    commentable.createdBy._id !== createdBy.current_user_id &&
                    !createdBy.is_admin) {
                    throw 'not allowed to post on this task'
                }
            }

            const updateObj = {
                comments: commentable.comments || []
            }
            updateObj.comments.push({
                comment,
                createdBy: this.currentUser,
                createdAt
            })

            this.sendNotificationEmail(type, param, createdBy, commentable.createdBy)

            return await db_commentable.update({_id: id}, updateObj)
        } else {
            throw 'commentable id is not valid'
        }
    }

    public async sendNotificationEmail(type, param, curUser, owner) {
        if (curUser.current_user_id === owner._id) {
            return; // Dont notify about own comments
        }

        const {
            comment
        } = param

        let ownerSubject = `Someone has commented on your ${type}`
        let ownerBody = `${curUser.profile.firstName} ${curUser.profile.lastName} says:<br/>${comment}`
        let ownerTo = owner.email
        let ownerToName = `${owner.profile.firstName} ${owner.profile.lastName}`

        await mail.send({
            to: ownerTo,
            toName: ownerToName,
            subject: ownerSubject,
            body: ownerBody
        })
    }
}
