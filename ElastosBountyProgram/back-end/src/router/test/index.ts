import Base from '../Base';

class helloworld extends Base {
    async action(){
        this.session.hello = 11;

        return this.result(1, 'hello world');
    }
}

export default Base.setRouter([
    {
        path: '/hello',
        router: helloworld,
        method: 'get'
    },
]);