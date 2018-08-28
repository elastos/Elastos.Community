import * as _ from 'lodash'

const create = (list) => {
    return _.zipObject(list, list)
};

export const USER_ROLE = {
    MEMBER : 'MEMBER',
    LEADER : 'LEADER',
    ADMIN : 'ADMIN',
    COUNCIL: 'COUNCIL'
};

export const USER_EMPOWER_TYPE = {
    MARKETING: 'MARKETING',
    PRODUCT_MANAGER: 'PRODUCT_MANAGER',
    LEGAL: 'LEGAL',
    DESIGNER: 'DESIGNER',
    MEDIA_PRODUCER: 'MEDIA_PRODUCER',
    WRITER: 'WRITER',
    PARTNERSHIP: 'PARTNERSHIP',
    INVESTMENTS: 'INVESTMENTS',
    BUSINESS_DEVELOPMENT: 'BUSINESS_DEVELOPMENT',
    MEDIA: 'MEDIA',
    WRITER_CONTENT: 'WRITER_CONTENT',
    WRITER_TECHNICAL: 'WRITER_TECHNICAL',
    LEAD_DEVELOPER_SUPPORT: 'LEAD_DEVELOPER_SUPPORT',
    DAPP_ANALYST: 'DAPP_ANALYST',
    ADMINISTRATOR: 'ADMINISTRATOR',
    HR_DIRECTOR: 'HR_DIRECTOR',
    SECURITY: 'SECURITY',
    OPEN_TITLE: 'OPEN_TITLE',
    LEAD_TRANSLATOR: 'LEAD_TRANSLATOR',
    DAPP_CONSULTANT: 'DAPP_CONSULTANT',
    REGIONAL_EVANGELIST: 'REGIONAL_EVANGELIST'
}

export const USER_LANGUAGE = {
    en: 'en',
    zh: 'zh'
}

export const USER_GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
}

export const TEAM_ROLE = {
    MEMBER : 'MEMBER',
    OWNER : 'OWNER'
};

export const TASK_CATEGORY = {
    DEVELOPER: 'DEVELOPER',
    SOCIAL: 'SOCIAL',
    LEADER: 'LEADER',
    CR100: 'CR100'
}

export const TASK_TYPE = {
    TASK: 'TASK',
    SUB_TASK: 'SUB_TASK',
    PROJECT: 'PROJECT',
    EVENT: 'EVENT'
}

export const TASK_EVENT_DATE_TYPE = {
    NOT_APPLICABLE: 'NOT_APPLICABLE',
    TENTATIVE: 'TENTATIVE',
    CONFIRMED: 'CONFIRMED'
}

export const TASK_STATUS = {
    // PROPOSAL: 'PROPOSAL',

    CREATED: 'CREATED', // if no ELA
    PENDING: 'PENDING', // if ELA > 0

    APPROVED: 'APPROVED', // Approved by admin

    ASSIGNED: 'ASSIGNED', // when max candidates are accepted or auto assigned

    // in between ASSIGNED and SUBMITTED, individual task candidates
    // can mark their completion which is recorded in the array candidateCompleted
    // this is only for reference, the task is not fully completed until the owner

    // owner acknowledges task is done - by enough parties (note it does not have to be all)
    SUBMITTED: 'SUBMITTED',

    SUCCESS: 'SUCCESS', // when admin accepts it as complete
    DISTRIBUTED: 'DISTRIBUTED', // when admin distributes ELA rewards
    CANCELED: 'CANCELED',

    // TODO: application deadline passed without any applicants
    EXPIRED: 'EXPIRED'
}

export const TASK_CANDIDATE_TYPE = {
    USER: 'USER',
    TEAM: 'TEAM'
}

export const TASK_CANDIDATE_CATEGORY = {
    RSVP: 'RSVP'
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

export const CONTRIB_CATEGORY = {
    BLOG: 'BLOG',
    VIDEO: 'VIDEO',
    PODCAST: 'PODCAST',
    OTHER: 'OTHER'
}

export const DEFAULT_IMAGE = {
    TASK : '/assets/images/task_thumbs/12.jpg',
    UNSET_LEADER: '/assets/images/User_Avatar_Other.png'
};

export const SUBMISSION_TYPE = {
    BUG: 'BUG',
    SECURITY_ISSUE: 'SECURITY_ISSUE',
    SUGGESTION: 'SUGGESTION',
    ADD_COMMUNITY: 'ADD_COMMUNITY',
    OTHER: 'OTHER',
    FORM_EXT: 'FORM_EXT',
    EMPOWER_35: 'EMPOWER_35'
};

export const SUBMISSION_CAMPAIGN = {
    COMMUNITY_ORGANIZER: 'COMMUNITY_ORGANIZER',
    ANNI_2008: 'ANNI_2008',
    ANNI_VIDEO_2008: 'ANNI_VIDEO_2008',
    EMPOWER_35: 'EMPOWER_35'
};

export const SKILLSET_TYPE = create(['CPP', 'JAVASCRIPT', 'GO', 'PYTHON', 'JAVA', 'SWIFT']);
export const TEAM_TASK_DOMAIN = create([
    'MEDIA',
    'IOT',
    'AUTHENTICITY',
    'CURRENCY',
    'GAMING',
    'FINANCE',
    'SOVEREIGNTY',
    'SOCIAL',
    'EXCHANGE'
])
export const TEAM_USER_STATUS = create(['NORMAL', 'PENDING', 'REJECT']);
