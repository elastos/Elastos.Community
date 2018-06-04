import Base from '../Base';
import TeamService from '../../service/TeamService';
import * as _ from 'lodash';
import {constant} from '../../constant';

export default class extends Base{

    /**
     * For consistency we call the service
     * with the entire query
     *
     * @param param
     * @returns {Promise<["mongoose".Document]>}
     */
    public async action(){
        const teamService = this.buildService(TeamService);
        const param = this.getParam();
        const rs = await teamService.list(param);

        return this.result(1, rs);
    }
}
