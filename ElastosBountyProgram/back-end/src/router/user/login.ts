import Base from '../Base';

export default class extends Base {
    async action(){
        // TODO login code here
        return this.result(1, this.getParam());
    }
}