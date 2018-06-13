import {Schema} from 'mongoose';

const CommentSchema = {
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}

export const Submission = {
    type : {
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

