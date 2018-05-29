import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import _ from 'lodash'
import config from '@/config'

export default createContainer(Component, (state, ownProps) => {
    return {};
}, () => {
    
    const communityService = new CommunityService()
    
    return {
        async getCommunityDetail(communityId) {
            return communityService.get(communityId)
        },
        async getSubCommunities(parentCommunityId) {
            return communityService.getSubCommunities(parentCommunityId)
        },
        async createSubCommunity(community) {
            return communityService.create(community)
        },
        async updateCommunity(community) {
            return communityService.update(community)
        },
    }
})
