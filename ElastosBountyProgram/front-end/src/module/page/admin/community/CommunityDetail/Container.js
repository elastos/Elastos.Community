import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import _ from 'lodash'
import config from '@/config'

export default createContainer(Component, (state, ownProps) => {
    if (!_.isArray(state.community.sub_communities)) {
        state.community.sub_communities = _.values(state.community.sub_communities)
    }
    
    // Mock data
    if (state.community.community_detail) {
        console.log('state.community.community_detail.geolocation', state.community.community_detail.geolocation);
        state.community.community_detail.leader = config.data.mockDataAllLeaders[0];
    }

    return state.community;
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
        updateBreadcrumbRegion(regions) {
            return communityService.updateBreadcrumbRegion(regions)
        }
    }
})
