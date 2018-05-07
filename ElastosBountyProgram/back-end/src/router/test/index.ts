import Base from '../Base';
import TestService from '../../service/TestService';

class helloworld extends Base {
    async action(){
        const testService = this.buildService(TestService);
        const list = await testService.getTestList();

        return this.result(1, list,'hello world');
    }
}

export default Base.setRouter([
    {
        path: '/hello',
        router: helloworld,
        method: 'get'
    },
]);