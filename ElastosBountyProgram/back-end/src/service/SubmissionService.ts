import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid} from '../utility';

const restrictedFields = {
    update: [
        '_id',
        'submissionId',
        'createdBy'
    ]
}

export default class extends Base {
    public async show(param): Promise<Document> {
        const db_submission = this.getDBModel('Submission')

        const submission = await db_submission.getDBInstance().findOne({_id: param.submissionId})

        return submission
    }

    public async list(query): Promise<Document> {
        const db_submission = this.getDBModel('Submission')
        const submissions = await db_submission.list(query, {
            updatedAt: -1
        });

        if (submissions.length) {
            for (let submission of submissions) {
                await db_submission.getDBInstance().populate(submission, [
                    'createdBy'
                ])
            }
        }

        return submissions
    }

    public async create(param): Promise<Document> {
        const {
            type, description
        } = param;
        this.validate_description(description)
        this.validate_type(type)

        const submission = {
            type,
            description,
            createdBy: this.currentUser._id
        }

        const db_submission = this.getDBModel('Submission')

        return await db_submission.save(submission)
    }

    public validate_description(description) {
        if(!validate.valid_string(description, 1)){
            throw 'invalid submission description'
        }
    }

    public validate_type(type) {
        if(!type){
            throw 'submission type is empty'
        }
        if(!_.includes(constant.SUBMISSION_TYPE, type)){
            throw 'submission type is not valid'
        }
    }

    public async update(param): Promise<boolean> {
        const {
            submissionId, type, description
        } = param

        const db_submission = this.getDBModel('Submission')
        const submission = await db_submission.findById(submissionId)
        const updateObj:any = _.omit(param, restrictedFields.update)

        await db_submission.update({_id: submissionId}, updateObj)

        return db_submission.findById(submissionId)
    }
}
