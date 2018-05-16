import Base from '../Base';

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
        return this.result(1, [
            {
                task_id: '17132b27-13d3-45c8-852b-d4c68193a310',
                task_name: 'first'
            },
            {
                task_id: '17132b27-13d3-45c8-852b-d4c68193a311',
                task_name: 'second'
            }
        ]);
    }
}
