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
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
};

