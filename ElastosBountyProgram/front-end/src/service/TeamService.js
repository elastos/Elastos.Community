import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {

    async list(filter={}){
        const result = await api_request({
            path: '/team/list',
            method: 'get',
            data: filter
        });

        return result;
    }
}
