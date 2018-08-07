import {Schema} from 'mongoose';

export const TeamProfile = {
    description : String,
    logo : String
};


export const Team = {
    name : {
        type : String,
        required : true
    },
    type : String,
    metadata : {
        type : Map,
        of : String
    },
    tags : [String],
    profile : TeamProfile,
    memberLimit : {
        type : Number,
        default : 10
    },
    recruiting : {
        type : Boolean,
        default : false
    },
    domain: String,
    recruitedSkillsets: [String],
    owner : {type: Schema.Types.ObjectId, ref: 'users'}
};

export const User_Team = {
    user : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    teamId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'teams'
    },
    status: {
        type: String
    },
    level: String,
    role: String,
    title: String,
    apply_reason : String
};
