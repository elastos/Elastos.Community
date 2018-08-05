import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {mail} from '../utility';

const sanitize = '-password -salt -email -resetToken'
const sanitizeWithEmail = '-password -salt -resetToken'

export default class extends Base {
    public async create(type, param): Promise<boolean> {
        const {
            comment, createdBy, id
        } = param

        const createdAt = param.createdAt || new Date()

        const db_commentable = this.getDBModel(type)
        let commentable = await db_commentable.getDBInstance().findOne({_id: id})
            .populate('createdBy')
            .populate('subscribers', sanitizeWithEmail)

        if (commentable) {
            const updateObj = {
                comments: commentable.comments || [],
                subscribers: commentable.subscribers || []
            }
            updateObj.comments.push({
                comment,
                createdBy: this.currentUser,
                createdAt
            })

            this.sendSubscriberEmails(type, param, createdBy, commentable.subscribers)

            if (commentable.createdBy) {
                this.sendNotificationEmail(type, param, createdBy, commentable.createdBy, null)

                if (!_.map(commentable.subscribers, (sub) => sub.user._id.toString()).includes(this.currentUser._id.toString())) {

                    if (commentable.createdBy._id.toString() !== this.currentUser._id.toString()) {
                        updateObj.subscribers.push({
                            user: this.currentUser,
                            lastSeen: new Date()
                        })
                    }
                }
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

    public async subscribe(type, param): Promise<boolean> {
        const {
            id
        } = param

        const db_commentable = this.getDBModel(type)
        let commentable = await db_commentable.getDBInstance().findOne({_id: id})
            .populate('createdBy')

        if (commentable) {

            if (_.map(commentable.subscribers, (sub) => sub._id.toString()).includes(this.currentUser._id.toString())) {
                return
            }

            const updateObj = {
                subscribers: commentable.subscribers || []
            }

            updateObj.subscribers.push({
                user: this.currentUser,
                lastSeen: new Date()
            })

            return await db_commentable.update({_id: id}, updateObj)
        } else {
            throw 'commentable id is not valid'
        }
    }

    public async unsubscribe(type, param): Promise<boolean> {
        const {
            id
        } = param

        const db_commentable = this.getDBModel(type)
        let commentable = await db_commentable.getDBInstance().findOne({_id: id})
            .populate('createdBy')
            .populate('subscribers', sanitize)

        if (commentable) {
            const updateObj = {
                subscribers: commentable.subscribers || []
            }

            updateObj.subscribers = _.filter(updateObj.subscribers, (subscriber) => {
                return subscriber.user && subscriber.user._id.toString() !== this.currentUser._id.toString()
            })

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
        let ownerBody = `
            ${curUser.profile.firstName} ${curUser.profile.lastName} says:<br/>${comment}
            <br/>
            <br/>
            <a href="${process.env.SERVER_URL}/profile/task-detail/${param.id}">Click here to view the ${type}</a>
        `

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

    public async sendSubscriberEmails(type, param, curUser, subscribers) {
        const {
            comment
        } = param

        let ownerSubject = `Someone has commented on a ${type} you subscribed to`
        let ownerBody = `
            ${curUser.profile.firstName} ${curUser.profile.lastName} says:<br/>${comment}
            <br/>
            <br/>
            <a href="${process.env.SERVER_URL}/profile/task-detail/${param.id}">Click here to view the ${type}</a>
        `

        // hack for now, don't send more than 1 email to an individual subscriber
        const seenEmails = {}

        for (let subscriber of subscribers) {
            if (curUser.current_user_id === subscriber.user._id) {
                return; // Dont notify about own comments
            }

            let ownerTo = subscriber.user.email
            let ownerToName = `${subscriber.user.profile.firstName} ${subscriber.user.profile.lastName}`

            if (seenEmails[ownerTo]) {
                continue
            }

            await mail.send({
                to: ownerTo,
                toName: ownerToName,
                subject: ownerSubject,
                body: ownerBody
            })

            seenEmails[ownerTo] = true
        }
    }
}
