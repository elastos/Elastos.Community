import Base from '../Base';
import UserService from '../../service/UserService';


export default class extends Base {
    // protected needLogin = true;
    async action(){
        if (this.session.user) {
            return this.result(1, this.session.user);
        } else {
            return this.result(-1, 'no session')
        }
    }
}
