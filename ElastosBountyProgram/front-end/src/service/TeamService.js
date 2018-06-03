import BaseService from '../model/BaseService'
import _ from 'lodash'

import {api_request} from '@/util';

export default class extends BaseService {

    async fetchList(){
        const rs = await api_request({
            path : '/team/list',
            data : {}
        });

        return rs;
    }
}
