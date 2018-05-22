import Base from '../Base';
import {uuid} from '../../utility';

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
        return this.result(1, {task_id: taskId});
    }

    async index() {

        if (!this.session.userId) {
            return this.result(-1, 'must be logged in')
        }

        // TODO
        return this.result(1, [
            {
                task_id: uuid(),
                task_name: 'first'
            },
            {
                task_id: uuid(),
                task_name: 'second'
            }
        ]);
    }
}
