import {Schema} from 'mongoose';
import {PictureSchema} from './PictureSchema'

export const TeamProfile = {
    description: String,
    logo : String
};

export const Team = {
    name: {
        type : String,
        required : true
    },
    metadata: {
        type: Map,
        of: String
    },
    tags: [String],
    profile: TeamProfile,
    domain: [String],
    recruitedSkillsets: [String],
    owner: {type: Schema.Types.ObjectId, ref: 'users'},
    pictures: [PictureSchema]
};

export const User_Team = {
    userId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    teamId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    status: {
        type: String
    },
    level: String,
    role: String,
    title: String,
    apply_reason : String
};
