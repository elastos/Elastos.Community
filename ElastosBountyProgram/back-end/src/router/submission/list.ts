import Base from '../Base';
import SubmissionService from '../../service/SubmissionService';
import * as _ from 'lodash';
import {constant} from '../../constant';
import {Types} from 'mongoose';
const ObjectId = Types.ObjectId;

export default class extends Base{

    /**
     * @param param
     * @returns {Promise<["mongoose".Document]>}
     */
    public async action(){
        const submissionService = this.buildService(SubmissionService);

        const param = this.getParam();
        const query: any = {
            archived: {$ne: true}
        };

        if (param.type && _.values(constant.SUBMISSION_TYPE).includes(param.type)) {
            query.type = param.type;
        }

        // for now the admin separates FORM_EXT to another menu item
        // however this is not the case for users
        if (param.admin) {
            // by default we only show tasks with these statuses
            query.type = {$ne: constant.SUBMISSION_TYPE.FORM_EXT}
            delete param.admin;
        } else if (param.profileListFor) {

            const currentUserId = new ObjectId(param.profileListFor)

            // list all submissions of the current user
            query.$or = [
                {createdBy: currentUserId}
            ]

            query.$or.push({subscribers: {$in: [currentUserId]}})

            // make sure this is the logged in user
            if (this.session.userId !== currentUserId.toString()) {
                throw 'submission.list API - profileListFor does not match session.userId'
            }
        }

        if (param.type){
            query.type = param.type
        }

        const list = await submissionService.list(query);
        const count = await submissionService.getDBModel('Submission').count(query);

        return this.result(1, {
            list,
            total: count
        });
    }
}
