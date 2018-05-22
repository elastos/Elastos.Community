import Base from './Base';
import {User} from './schema/UserSchema';

export default class extends Base {
    protected getSchema(){
        return User;
    }
    protected getName(){
        return 'users'
    }
    protected rejectFields(){
        return {
            password : false,
            salt : false
        };
    }
}