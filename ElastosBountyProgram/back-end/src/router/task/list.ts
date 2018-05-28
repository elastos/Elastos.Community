import Base from '../Base';
import TaskService from '../../service/TaskService';

export default class extends Base{
    protected needLogin = true;
    public async action(){
        const taskService = this.buildService(TaskService);

        const param = this.getParam();
        const query: any = {};
        if(param.type){
            query.type = param.type;
        }
        if(param.category){
            query.category = param.category;
        }

        const list = await taskService.list(query);
        const count = await taskService.getDBModel('Task').count(query);

        return this.result(1, {
            list,
            total: count
        });
    }
}