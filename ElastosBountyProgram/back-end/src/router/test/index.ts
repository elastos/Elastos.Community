import Base from '../Base';

class helloworld extends Base {
    async action(){
        const Test = this.db.getModel('Test');
        const list = await Test.find({});

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