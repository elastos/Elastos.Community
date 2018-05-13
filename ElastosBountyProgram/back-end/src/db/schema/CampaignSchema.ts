import {Schema} from 'mongoose';

export const CampaignOutput = {
    description: String,
    images : [String]
};

export const CampaignReward = {
    ela : {
        type : Number,
        min : 0
    },
    votePower : {
        type : Number,
        min : 0
    }
};

export const CampaignCandidate = {
    /*
    * person, team
    * */
    type : {
        type : String,
        required : true
    },
    ID : Schema.Types.ObjectId,
    status : {
        type : String
    },
    output : CampaignOutput
};

export const Campaign = {
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },

    /*
    * project, issue, task
    * */
    type : {
        type : String,
        default : 'task'
    },

    startTime : {
        type : Date,
        required : true,
        min : Date.now
    },

    endTime : {
        type : Date,
        required : true
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

    candidates : [CampaignCandidate],

    reward : CampaignReward
};