import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'


export default class extends BaseService {
    async postComment(type, reduxType, detailReducer, id, commentData) {
        const redux = this.store.getRedux(reduxType || type)
        const data = {
            comment: commentData,
            createdBy: this.store.getState().user,
            createdAt: new Date().toISOString()
        }
        const rs = await api_request({
            path: `/api/${type}/${id}/comment`,
            method: 'post',
            data
        })
        const curDetail = this.store.getState()[reduxType || type] && this.store.getState()[reduxType || type].detail;

        if (!curDetail) {
            return;
        }

        let subDetail = curDetail
        if (detailReducer) {
            subDetail = detailReducer(curDetail)
        }

        subDetail.comments = subDetail.comments || [];
        subDetail.comments.push([data]);

        this.dispatch(redux.actions.detail_update(curDetail))

        return rs
    }
}
