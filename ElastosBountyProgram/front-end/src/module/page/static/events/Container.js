import {createContainer} from '@/util'
import Component from './Component'

export default createContainer(Component, (state, ownProps) => {
    console.log("ownProps:", ownProps)
    console.log("state:", state)
    return {
    }
}, () => {

    const getSocialEventsService = () => {
        return ["Melbourne Meetup", "Lolol"]
    };

    return {
        async getSocialEvents() {
            return getSocialEventsService
        }
    }
})
