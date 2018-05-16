import BaseService from '../model/BaseService'
import _ from 'lodash'

export default class extends BaseService {

    async index() {
        const userRedux = this.store.getRedux('user')
        const taskRedux = this.store.getRedux('task')

        // this.dispatch(taskRedux.actions.fetchTaskBegin())

        let res = await fetch(process.env.SERVER_URL + '/task')

        let result = await res.json()

        // this.dispatch(taskRedux.actions.fetchTaskSuccess(res.json()))

        this.dispatch(taskRedux.actions.items_update(result.data))

        return res
    }
}
