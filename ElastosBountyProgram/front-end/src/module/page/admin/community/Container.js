import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import _ from 'lodash'

export default createContainer(Component, (state, ownProps) => {
    if (!_.isArray(state.community.all_leaders)) {
        state.community.all_leaders = _.values(state.community.all_leaders)
    }
    
    if (!_.isArray(state.community.country_leaders)) {
        state.community.country_leaders = _.values(state.community.country_leaders)
    }

    return state.community;
}, () => {

    const communityService = new CommunityService()

    return {
        async getAllLeaders () {
            return communityService.getAllLeaders()
        },
        async getLeadersACountry (countryCode) {
            return communityService.getLeadersACountry(countryCode)
        },
        async addCountry (country) {
            return communityService.addCountry(country)
        }
    }
})
