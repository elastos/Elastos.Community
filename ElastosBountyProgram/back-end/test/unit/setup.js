global.DB = {
    MEMBER_USER : {
        username: `test_member`,
        password: 'ebp1234',
        email: 'test_member@ebp.com',
        firstName: 'Hello',
        lastName: 'World',
        country: 'Canada',
        city: 'Vancouver'
    },
    ADMIN_USER : {
        username: 'admin@ebp.com'
    },

    TASK_1 : {
        "name": "test_task",
        "description": "This is a test campaign, user must put their requirements and rewards here.",
        "communityId": "",
        "type": "TASK",
        "startTime": "",
        "endTime": "",
        "candidateLimit": 1,
        "candidateSltLimit": 1,
        "reward_ela": 1000,
        "reward_evp": 10
    },

    TASK_2 : {
        "name": "test_event",
        "description": "This is a test event",
        "communityId": "",
        "type": "EVENT",
        "startTime": "",
        "endTime": "",
        "candidateLimit": 0,
        "candidateSltLimit": 0,
        "reward_ela": 1000,
        "reward_evp": 10
    },

    TEAM_1 : {
        name : 'test team 1',
        description : 'this is test team 1',
        type : 'DEVELOP',
        metadata : 'key|value,k1|v1',
        tags : 'key1,key2',
        logo : 'logo_url'
    },
    TEAM_UPDATE : {
        name : 'test team 1111',
        description : 'this is test team 1',
        tags : 'key1,key2',
        logo : 'logo_url111',
        recruiting : false
    }
};
