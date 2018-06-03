import Base from './Base';
import {Log} from './schema/LogSchema';

export default class extends Base {
    protected getSchema(){
        return Log;
    }
    protected getName(){
        return 'logs'
    }
}
