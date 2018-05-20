import BaseService from '../model/BaseService'
import _ from 'lodash'

export default class extends BaseService {

    async index() {

        const taskRedux = this.store.getRedux('task')

        // this.dispatch(taskRedux.actions.fetchTaskBegin())

        let request = new Request(process.env.SERVER_URL + '/task', {
            method: 'GET',
            headers: new Headers({
                'api-token': sessionStorage.getItem('api-token')
            })
        })

        let result = await fetch(request).then((res) => res.json())

        // this.dispatch(taskRedux.actions.fetchTaskSuccess(res.json()))

        if (result.code !== 1) {
            throw new Error('Not Authenticated')
        }

        // TODO: why does this set it as a struct?
        this.dispatch(taskRedux.actions.all_tasks_update(result.data))

        return result
    }
}
