import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'

export default createContainer(Component, (state, ownProps) => {
    return {};
}, () => {
    
    const communityService = new CommunityService()
    
    return {
        async getAllCountryCommunity () {
            return communityService.getAllCountryCommunities()
        },
        async getSpecificCountryCommunities (countryCode) {
            return communityService.getSpecificCountryCommunities(countryCode)
        },
        async addCountry (country) {
            return communityService.addCountry(country)
        }
    }
})
