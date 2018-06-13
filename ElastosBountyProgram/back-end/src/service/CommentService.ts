import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid} from '../utility';

export default class extends Base {
    public async create(type, param): Promise<boolean> {
        const {
            comment, createdBy, createdAt, id
        } = param

        const db_commentable = this.getDBModel(type)
        const commentable = await db_commentable.findById(id)

        if (commentable) {
            const updateObj = {
                comments: commentable.comments || []
            }
            updateObj.comments.push({
                comment,
                createdBy,
                createdAt
            })

            return await db_commentable.update({_id: id}, updateObj)
        } else {
            throw 'commentable id is not valid'
        }
    }
}
