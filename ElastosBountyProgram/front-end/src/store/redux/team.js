import BaseRedux from '@/model/BaseRedux';

class TeamRedux extends BaseRedux {
    defineTypes() {
        return ['team'];
    }

    defineDefaultState() {
        return {
            active_team: null,
            loading: false,
            all_teams: [],
            all_circles: [],
            all_circles_loading: false,
            detail: {}
        };
    }
}

export default new TeamRedux()
