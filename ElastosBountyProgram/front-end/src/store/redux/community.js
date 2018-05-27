import BaseRedux from '@/model/BaseRedux'

class CommunityRedux extends BaseRedux {
    defineTypes () {
        return ['community']
    }
    
    defineDefaultState(){
        return {
            all_country_communities: [],
            specific_country_communities: [],
            sub_communities: [],
            community_detail: null,
            breadcrumb_regions: [],
            breadcrumb_countries: [],
        };
    }
}

export default new CommunityRedux()
