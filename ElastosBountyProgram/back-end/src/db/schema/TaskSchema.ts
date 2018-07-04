import {Schema} from 'mongoose';
import {ELA, VotePower} from "./UserSchema";
import {constant} from '../../constant';
import {CommentSchema} from './CommentSchema';


// TODO: allow links?
export const TaskOutput = {
    description: String,
    images : [String]
};

/**
 * Some Tasks request an upfront ELA transfer
 */
export const TaskUpfront = {
    ela : Number,
    usd: Number,

    elaDisbursed: Number,

    elaPerUsd: Number,
    isUsd: Boolean
}

// we should keep isUsd here in case we allow in the future
// a budget in USD and payment in ELA
export const TaskReward = {
    ela : Number,
    usd: Number,

    // if ELA reward is allocated to sub-tasks (v1.5)
    elaDisbursed: Number,
    votePower : Number,

    elaPerUsd: Number,
    isUsd: Boolean
};

export const TaskCandidate = {
    // constants.TASK_CANDIDATE_TYPE - PERSON, TEAM
    type : {
        type : String,
        required : true
    },
    team : {type: Schema.Types.ObjectId, ref: 'team'},
    user : {type: Schema.Types.ObjectId, ref: 'users'},

    // constants.TASK_CANDIDATE_STATUS - PENDING, APPROVED
    status : {
        type : String
    },

    applyMsg: String,

    complete: Boolean,

    // this is the admin that approved the candidate
    approvedBy: Schema.Types.ObjectId,

    output : TaskOutput,

    comments: [[CommentSchema]],
    subscribers: [{type: Schema.Types.ObjectId, ref: 'user'}]
};

export const TaskActivity = {
    type : {
        type : String,
        required : true
    },
    userId : Schema.Types.ObjectId,
    notes : String
}

/**
 * A task is a base class for any event
 *
 */
export const Task = {

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    descBreakdown: String,

    thumbnail : {
        type : String
    },

    attachment: {
        type : String
    },

    attachmentType: String,
    attachmentFilename: String,

    /**
     * Owners of a parent task may create sub tasks
     * They may also allocate ELA to subtasks
     *
     * This is a v1.5 feature
     */
    parentTaskId: {

    },

    // for events this should be set, or if null assume online
    community: {type: Schema.Types.ObjectId, ref: 'community'},
    communityParent: {type: Schema.Types.ObjectId, ref: 'community'},

    category: {
        type: String,
        default: constant.TASK_CATEGORY.LEADER
    },

    /*
    * TASK, SUB-TASK, PROJECT, EVENT
    * */
    type : {
        type : String,
        default : constant.TASK_TYPE.TASK
    },

    location: String,

    infoLink: String,

    // only used if this is an event - not used in logic
    startTime : {
        type : Date,
        required : false,
        min : Date.now
    },
    endTime : {
        type : Date,
        required : false
    },

    // TODO: after this date task automatically moves to ASSIGNED,
    // or CANCELED if there are no candidates
    applicationDeadline: Date,

    // TODO: after this date, if the task is not marked SUBMITTED it becomes CANCELED
    completionDeadline: Date,

    /*
    * constants.TASK_STATUS
    * */
    status : {
        type : String
    },

    /**
     * - candidateLimit should be allowed to = 0
     *
     * 1.   IF candidateLimit = 0 THEN Leader creates task proposal for themselves to do -->
     *      they get approved --> (optional create sub-task and assign to members - v2) -->
     *      get ELA upfront (if any) --> do the task --> then they get reward based on allocation to sub-tasks, leader gets remainder
     *
     *      (this will be a common scenario if a leader is organizing an event)*
     *
     * 2.   IF candidateLimit >= 1 THEN Leader creates task for others to do -->
     *      it gets approved --> other member adds self as candidate (1 or more) -->
     *      leader selects (1 or more) candidate --> each candidate gets ELA upfront (if any) -->
     *      all candidate does the task --> each candidate that is successful gets reward
     *
     *      (this will be a common scenario if a leader is creating bounties for others to do)*
     */
    candidateLimit : {
        type : Number,
        min : 1,
        required : true
    },

    candidateSltLimit : {
        type : Number,
        min : 1,
        default: 1,
        required : true
    },

    rewardUpfront: TaskUpfront,
    reward : TaskReward,

    assignSelf: Boolean,

    approvedBy: {type: Schema.Types.ObjectId, ref: 'users'},

    candidates: [{type: Schema.Types.ObjectId, ref: 'task_candidate'}],

    /* ids of candidates that marked themselves as complete */
    candidateCompleted: [{type: Schema.Types.ObjectId, ref: 'task_candidate'}],

    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},

    comments: [[CommentSchema]]

};


export const Task_Candidate = {
    ...TaskCandidate,
    task : {type: Schema.Types.ObjectId, ref: 'task'}
};
