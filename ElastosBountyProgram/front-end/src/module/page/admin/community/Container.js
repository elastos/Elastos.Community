import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import _ from 'lodash'

export default createContainer(Component, (state, ownProps) => {
    if (!_.isArray(state.community.all_country_communities)) {
        state.community.all_country_communities = _.values(state.community.all_country_communities)
    }

    if (!_.isArray(state.community.breadcrumb_regions)) {
        state.community.breadcrumb_regions = _.values(state.community.breadcrumb_regions)
    }
    
    if (!_.isArray(state.community.specific_country_communities)) {
        state.community.specific_country_communities = _.values(state.community.specific_country_communities)
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
        },
        async updateLeadersACountry (country) {
            return communityService.updateLeadersACountry(country)
        }
    }
})
