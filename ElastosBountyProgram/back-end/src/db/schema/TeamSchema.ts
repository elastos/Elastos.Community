import {Schema} from 'mongoose';

export const TeamProfile = {
    description : String,
    logo : String
};

const PictureSchema = {
    thumbUrl: String,
    name: String,
    remote_link: String
};

export const Team = {
    name : {
        type : String,
        required : true
    },
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
    domain: String,
    recruitedSkillsets: [String],
    owner : {type: Schema.Types.ObjectId, ref: 'users'},
    pictures: [PictureSchema]
};

export const User_Team = {
    user: {
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
