import {Schema} from "mongoose";
import {constant} from "../../constant";


export const CVote = {
    title : {
        type : String,
        required : true
    },
    vid : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    // name of proposer
    proposedBy : {
        type : String,
        required : true
    },
    motionId : {
        type : String,
    },
    isConflict : {
        type : String
    },
    notes : {
        type : String
    },
    vote_map : Object,
    reason_map : Object,
    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},

    published: {
        type: Boolean,
        default: false,
        required: true
    },

    status : {
        type : String
    }
};
