import {Schema} from 'mongoose';
import {CommentSchema} from './CommentSchema';

const communityProps = {
    community : {
        type : String
    },
    state : {
        type : String
    },
    city : {
        type : String
    }
}

export const Submission = {
    type : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [[CommentSchema]],
    ...communityProps
};

