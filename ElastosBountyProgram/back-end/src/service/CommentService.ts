import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid} from '../utility';

export default class extends Base {
    public async create(type, param): Promise<boolean> {
        const {
            comment, createdBy, id
        } = param

        const db_submission = this.getDBModel(type)
        const submission = await db_submission.findById(id)

        if (submission) {
            const updateObj = {
                comments: submission.comments || []
            }
            updateObj.comments.push({
                comment,
                createdBy,
                createdAt: new Date().toISOString()
            })

            return await db_submission.update({_id: id}, updateObj)
        } else {
            throw 'submission id is not valid'
        }
    }
}
