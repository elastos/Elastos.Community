import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {

    async list(filter={}){
        const result = await api_request({
            path: '/submission/list',
            method: 'get',
            data: filter
        });

        return result;
    }

    async index(qry) {

        const submissionRedux = this.store.getRedux('submission')

        this.dispatch(submissionRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/submission/list',
            method: 'get',
            data: qry
        })

        this.dispatch(submissionRedux.actions.loading_update(false))
        this.dispatch(submissionRedux.actions.all_submissions_reset())
        this.dispatch(submissionRedux.actions.all_submissions_update(result.list))

        return result
    }

    async get(submissionId) {

        const submissionRedux = this.store.getRedux('submission')

        this.dispatch(submissionRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/submission/${submissionId}`,
            method: 'get'
        })

        this.dispatch(submissionRedux.actions.loading_update(false))

        if (result) {
            this.dispatch(submissionRedux.actions.detail_update(result))
            return result
        }
    }

    /**
     * @param taskId
     * @param doc
     * @returns {Promise<*>}
     */
    async update(submissionId, doc) {

        const submissionRedux = this.store.getRedux('submission')

        this.dispatch(submissionRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/submission/${submissionId}`,
            method: 'put',
            data: doc
        })

        const curSubmissionDetail = this.store.getState().submission.detail

        this.dispatch(submissionRedux.actions.detail_update(curSubmissionDetail))
        this.dispatch(submissionRedux.actions.loading_update(false))

        return result
    }

    async create(doc) {
        const res = await api_request({
            path: '/submission/create',
            method: 'post',
            data: doc
        })

        return res;
    }

    async resetAllSubmissions() {
        const submissionRedux = this.store.getRedux('submission')
        this.dispatch(submissionRedux.actions.all_submissions_reset())
    }

    async resetSubmissionDetail() {
        const submissionRedux = this.store.getRedux('submission')
        this.dispatch(submissionRedux.actions.detail_reset())
    }

}
