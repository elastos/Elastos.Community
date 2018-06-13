import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'


export default class extends BaseService {
    async postComment(type, id, commentData) {
        const redux = this.store.getRedux(type)
        const data = {
            comment: commentData,
            createdBy: this.store.getState().user,
            createdAt: new Date().toISOString()
        }
        const rs = await api_request({
            path: `/${type}/${id}/comment`,
            method: 'post',
            data
        })
        const curDetail = this.store.getState()[type] && this.store.getState()[type].detail;

        if (!curDetail) {
            return;
        }

        curDetail.comments = curDetail.comments || [];
        curDetail.comments.push([data]);

        this.dispatch(redux.actions.detail_update(curDetail))

        return rs
    }

    async get(type, id) {
        const redux = this.store.getRedux(type)

        this.dispatch(redux.actions.loading_update(true))

        const result = await api_request({
            path: `/${type}/${id}`,
            method: 'get',
        })

        this.dispatch(redux.actions.loading_update(false))

        if (result) {
            this.dispatch(redux.actions.detail_update(result))
            return result
        }
    }
}
