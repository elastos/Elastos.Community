import {Schema} from 'mongoose';

export const TeamProfile = {
    description : String,
    logo : String,
    images : [String],
    createTime : Date,
};

export const TeamMember = {
    userId : String,
    name : String,
    level : String,
    role : String
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
    members : [TeamMember],
    owner : Schema.Types.ObjectId
};


export const User_Team = {
    userId : {
        required : true,
        type : Schema.Types.ObjectId
    },
    teamId : {
        required : true,
        type : Schema.Types.ObjectId
    }
};