import {Schema} from 'mongoose';
import {CommentSchema} from './CommentSchema';

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
    comments: [[CommentSchema]]
};

