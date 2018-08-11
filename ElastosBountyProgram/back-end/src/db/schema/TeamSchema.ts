import {Schema} from 'mongoose';
import {PictureSchema} from './PictureSchema'
import {CommentSchema} from './CommentSchema'

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
    members: [{type: Schema.Types.ObjectId, ref: 'user_team'}],
    pictures: [PictureSchema],
    comments: [[CommentSchema]]
};

export const User_Team = {
    status: {
        type: String
    },
    level: String,
    role: String,
    title: String,
    apply_reason : String,
    team: {type: Schema.Types.ObjectId, ref: 'team'},
    user: {type: Schema.Types.ObjectId, ref: 'users'}
};
