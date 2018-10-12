

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
    createdBy : {
        type : String
    },
    status : {
        type : String
    }
};