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
                name: config.data.mappingCountryCodeToName[country.geolocation],
                parentCommunityId: null,
                geolocation: country.geolocation,
                type: COMMUNITY_TYPE.COUNTRY,
                leaderId: config.data.mockDataLeaderId,
            }
        })
    }

    async getSpecificCountryCommunities(countryCode) {
        const result = await api_request({
            path: '/community/country/' + countryCode,
            method: 'get',
        })

        return result
    }

    async getAllCountryCommunities() {
        const result = await api_request({
            path: '/community',
            method: 'get',
        })

        return result
    }
    
    async update(community) {
        const result = await api_request({
            path: '/community/update',
            method: 'put',
            data: community
        })

        return result
    }
    
    async getLeadersACountry(countryCode) {

        const result = await api_request({
            path: '/community/country/' + countryCode, method: 'get',
        })

        return result
    }
    
    async getSubCommunities(parentCommunityId) {
        const result = await api_request({
            path: '/community/parent/' + parentCommunityId, method: 'get',
        })

        return result
    }

    async get(communityId) {
        const result = await api_request({
            path: '/community/' + communityId, method: 'get',
        })

        return result
    }
    
    async create(community) {
        const result = await api_request({
            path: '/community/create', method: 'POST', data: community
        })

        return result
    }
}
