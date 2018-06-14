import * as _ from 'lodash';

const create = (constant_list: [string]): any => {
    const map = {};
    _.each(constant_list, (key)=>{
        map[key] = key;
    });

    return map;
}

export const USER_ROLE = {
    MEMBER : 'MEMBER',
    LEADER : 'LEADER',
    ADMIN : 'ADMIN',
    COUNCIL: 'COUNCIL'
};

export const USER_LANGUAGE = {
    en: 'en',
    zh: 'zh'
}

export const TASK_TYPE = {
    TASK: 'TASK',
    SUB_TASK: 'SUB_TASK',
    PROJECT: 'PROJECT',
    EVENT: 'EVENT'
}

export const TASK_CATEGORY = {
    DEVELOPER: 'DEVELOPER',
    SOCIAL: 'SOCIAL',
    LEADER: 'LEADER'
}

export const TASK_STATUS = {
    PROPOSAL: 'PROPOSAL',
    CREATED: 'CREATED',
    APPROVED: 'APPROVED',
    ASSIGNED: 'ASSIGNED',
    PENDING: 'PENDING',
    SUBMITTED: 'SUBMITTED', // when user says it is complete
    SUCCESS: 'SUCCESS',
    DISTRIBUTED: 'DISTRIBUTED',
    CANCELED: 'CANCELED',
    EXPIRED: 'EXPIRED'
}

export const TASK_CANDIDATE_TYPE = {
    USER: 'USER',
    TEAM: 'TEAM'
}

export const TASK_CANDIDATE_STATUS = {
    // NOT_REQUIRED: 'NOT_REQUIRED',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
}

export const COMMUNITY_TYPE = {
    COUNTRY: 'COUNTRY',
    STATE: 'STATE',
    CITY: 'CITY',
    REGION: 'REGION',
    SCHOOL: 'SCHOOL'
}

export const TRANS_STATUS = {
    PENDING: 'PENDING',
    CANCELED: 'CANCELED',
    FAILED: 'FAILED',
    SUCCESSFUL: 'SUCCESSFUL'
}

// team constant
export const TEAM_ROLE = create(['MEMBER', 'LEADER']);
export const TEAM_USER_STATUS = create(['NORMAL', 'PENDING', 'REJECT']);
export const TEAM_TYPE = create(['DEVELOP', 'MARKET', 'DESIGN', 'PROJECT', 'OTHER']);

// log
export const LOG_TYPE = {
    'APPLY_TEAM' : 'apply_team'
};

export const SUBMISSION_TYPE = {
    BUG: 'BUG',
    SECURITY_ISSUE: 'SECURITY_ISSUE',
    SUGGESTION: 'SUGGESTION',
    ADD_COMMUNITY: 'ADD_COMMUNITY',
    OTHER: 'OTHER'
};
