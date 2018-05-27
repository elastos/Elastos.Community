import BaseService from '../model/BaseService'
import {api_request} from '@/util'
import {COMMUNITY_TYPE} from '@/constant'
import config from '@/config'

export default class extends BaseService {

    async addCountry(country) {
        const res = await api_request({
            path: '/community/create',
            method: 'post',
            // Mock data
            data: {
                name: config.data.mappingCountryCodeToName[country.country],
                parentCommunityId: null,
                geolocation: country.country,
                type: COMMUNITY_TYPE.COUNTRY,
                leaderId: config.data.mockDataLeaderId,
            }
        })
    }

    async getLeadersACountry(countryCode) {
        const communityRedux = this.store.getRedux('community')
        
        const result = await api_request({
            path: '/community/country/' + countryCode,
            method: 'get',
        })

        // TODO: why does this set it as a struct?
        this.dispatch(communityRedux.actions.specific_country_communities_reset())
        this.dispatch(communityRedux.actions.specific_country_communities_update(result))

        return result
    }

    async getAllLeaders() {
        const communityRedux = this.store.getRedux('community')
    
        const result = await api_request({
            path: '/community',
            method: 'get',
        })
    
        // TODO: why does this set it as a struct?
        this.dispatch(communityRedux.actions.all_country_communities_reset())
        this.dispatch(communityRedux.actions.all_country_communities_update(result))
    
        return result
    }
    
    async updateLeaderACountry(countryCode) {
        const communityRedux = this.store.getRedux('community')

        const result = await api_request({
            path: '/community/update/',
            method: 'put',
        })

        return result
    }
    
    async getLeadersACountry(countryCode) {
        const communityRedux = this.store.getRedux('community')
    
        const result = await api_request({
            path: '/community/country/' + countryCode, method: 'get',
        })
    
        // TODO: why does this set it as a struct?
        this.dispatch(communityRedux.actions.specific_country_communities_reset())
        this.dispatch(communityRedux.actions.specific_country_communities_update(result))
        
        return result
    }
    
    async getSubCommunities(parentCommunityId) {
        const communityRedux = this.store.getRedux('community')
        
        const result = await api_request({
            path: '/community/parent/' + parentCommunityId, method: 'get',
        })
        
        this.dispatch(communityRedux.actions.sub_communities_reset())
        this.dispatch(communityRedux.actions.sub_communities_update(result))
    
        return result
    }

    async get(communityId) {
        const communityRedux = this.store.getRedux('community')

        const result = await api_request({
            path: '/community/' + communityId, method: 'get',
        })

        this.dispatch(communityRedux.actions.community_detail_reset())
        this.dispatch(communityRedux.actions.community_detail_update(result))
    
        return result
    }
    
    async create(community) {
        const result = await api_request({
            path: '/community/create', method: 'POST', data: community
        })

        return result
    }
    
    updateBreadcrumbCountry(countries) {
        const communityRedux = this.store.getRedux('community')

        this.dispatch(communityRedux.actions.breadcrumb_countries_reset())
        this.dispatch(communityRedux.actions.breadcrumb_countries_update(countries))
    }
    
    updateBreadcrumbRegion(regions) {
        const communityRedux = this.store.getRedux('community')
        
        this.dispatch(communityRedux.actions.breadcrumb_regions_reset())
        this.dispatch(communityRedux.actions.breadcrumb_regions_update(regions))
    }
}
