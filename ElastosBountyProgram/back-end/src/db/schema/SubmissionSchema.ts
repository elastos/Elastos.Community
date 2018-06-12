import {Schema} from 'mongoose';

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
    comments: {
        type: Schema.Types.Array
    }
};

