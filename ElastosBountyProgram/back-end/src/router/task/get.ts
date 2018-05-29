import Base from '../Base';
import TaskService from '../../service/TaskService';
import {uuid} from '../../utility';

/**
 * Both the '/' and '/:taskId' routes map to this class
 */
export default class GetTask extends Base {

    protected needLogin = false;

    async action(){

        const taskId = this.getParam('taskId');

        if (!taskId) {
            // TODO: pass in query params later
            return await this.index()
        }
        return await this.show(taskId)
    }

    async show(taskId) {
        const taskService = this.buildService(TaskService);
        const rs = await taskService.show(this.getParam());
        return this.result(1, rs);
    }

    async index() {

        const taskService = this.buildService(TaskService);
        const rs = await taskService.index(this.getParam());

        return this.result(1, rs);
    }
}
