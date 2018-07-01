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
        let commentable = await db_commentable.getDBInstance().findOne({_id: id})
            .populate('createdBy')

        if (commentable) {
            const updateObj = {
                comments: commentable.comments || []
            }
            updateObj.comments.push({
                comment,
                createdBy: this.currentUser,
                createdAt
            })

            if (commentable.createdBy) {
                this.sendNotificationEmail(type, param, createdBy, commentable.createdBy, null)
            } else {
                commentable = await db_commentable.getDBInstance().findOne({_id: id})
                    .populate('createdBy')
                    .populate('user')

                const db_task = this.getDBModel('Task')
                const task = await db_task.getDBInstance().findOne({_id: commentable.task.toString()})
                    .populate('createdBy')

                this.sendNotificationEmail('Application', param, createdBy, task.createdBy, commentable.user)
            }

            return await db_commentable.update({_id: id}, updateObj)
        } else {
            throw 'commentable id is not valid'
        }
    }

    public async sendNotificationEmail(type, param, curUser, owner, notifier) {
        if (curUser.current_user_id === owner._id.toString() && !notifier) {
            return; // Dont notify about own comments
        }

        const {
            comment
        } = param

        let ownerSubject = `Someone has commented on your ${type}`
        let ownerBody = `${curUser.profile.firstName} ${curUser.profile.lastName} says:<br/>${comment}`

        const recipient = notifier || owner
        let ownerTo = recipient.email
        let ownerToName = `${recipient.profile.firstName} ${recipient.profile.lastName}`

        await mail.send({
            to: ownerTo,
            toName: ownerToName,
            subject: ownerSubject,
            body: ownerBody
        })
    }
}
