import Base from '../Base';
import TaskService from '../../service/TaskService';
import * as _ from 'lodash';
import {constant} from '../../constant';

export default class extends Base{

    /**
     * If the status is not provided, we default to
     * returning only CREATED, APPROVED statuses
     *
     * CREATED - does not require approval
     * APPROVED - task approved by admin
     *
     * @param param
     * @returns {Promise<["mongoose".Document]>}
     */
    public async action(){
        const taskService = this.buildService(TaskService);

        const param = this.getParam();
        const query: any = {
            archived: {$ne: true}
        };

        if (param.type && _.values(constant.TASK_TYPE).includes(param.type)) {
            query.type = param.type;
        }
        if (param.category && _.values(constant.TASK_CATEGORY).includes(param.category)) {
            query.category = param.category;
        }

        if (param.admin) {
            delete param.admin;
            query.status = {$ne: constant.TASK_STATUS.CANCELED}

        } else if (!param.status) {
            query.status = {$in: [
                    constant.TASK_STATUS.CREATED,
                    constant.TASK_STATUS.APPROVED
                ]}
        }

        const list = await taskService.list(query);
        const count = await taskService.getDBModel('Task').count(query);

        return this.result(1, {
            list,
            total: count
        });
    }
}
