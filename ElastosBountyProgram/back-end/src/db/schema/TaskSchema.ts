import {Schema} from 'mongoose';
import {ELA, VotePower} from "./UserSchema";

// TODO: allow links?
export const TaskOutput = {
    description: String,
    images : [String]
};

/**
 * Some Tasks request an upfront ELA transfer
 * @type {{ela: {address: StringConstructor; amount: "mongoose".Schema.Types.Decimal128}}}
 */
export const TaskUpfront = {
    ela : ELA
}

export const TaskReward = {
    ela : ELA,

    // if ELA reward is allocated to sub-tasks (v1.5)
    elaAllocated: ELA,
    votePower : VotePower
};

export const TaskCandidate = {
    // constants.TASK_CANDIDATE_TYPE - PERSON, TEAM
    type : {
        type : String,
        required : true
    },
    teamId : Schema.Types.ObjectId,
    userId : Schema.Types.ObjectId,

    // constants.TASK_CANDIDATE_STATUS - PENDING, APPROVED
    status : {
        type : String
    },

    // this is the admin that approved the candidate
    approvedBy: Schema.Types.ObjectId,

    output : TaskOutput
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
 * A task is a base class for any event,
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

    /**
     * Owners of a parent task may create sub tasks
     * They may also allocate ELA to subtasks
     *
     * This is a v1.5 feature
     */
    parentTaskId: {

    },

    // for events this should be set, or if null assume online
    communityId: Schema.Types.ObjectId,

    /*
    * TASK, SUB-TASK, PROJECT, EVENT
    * */
    type : {
        type : String,
        default : 'task'
    },

    startTime : {
        type : Date,
        required : false,
        min : Date.now
    },

    endTime : {
        type : Date,
        required : false
    },

    /*
    * electing, success, failure, cancel
    * */
    status : {
        type : String
    },

    candidateLimit : {
        type : Number,
        min : 1,
        required : true
    },

    candidates : [TaskCandidate],

    reward : TaskReward,

    activityLog: []
};
