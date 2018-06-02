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
    },
    status : {
        type : String
    },
    level : String,
    role : String,
    title : String
};
