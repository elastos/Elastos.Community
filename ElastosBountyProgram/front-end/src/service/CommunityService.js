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
        // TEST
        const communityRedux = this.store.getRedux('community')
        
        const result = await api_request({
            path: '/community/country/' + countryCode,
            method: 'get',
        })

        // TODO: why does this set it as a struct?
        this.dispatch(communityRedux.actions.country_leaders_reset())
        this.dispatch(communityRedux.actions.country_leaders_update(result))

        return result
    }

    async getAllLeaders() {
        // TEST
        const communityRedux = this.store.getRedux('community')
    
        const result = await api_request({
            path: '/community',
            method: 'get',
        })
    
        // TODO: why does this set it as a struct?
        this.dispatch(communityRedux.actions.all_leaders_reset())
        this.dispatch(communityRedux.actions.all_leaders_update(result))
    
        return result
    }
}
