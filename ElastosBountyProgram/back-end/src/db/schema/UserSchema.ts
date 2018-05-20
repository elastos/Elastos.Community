import {Schema} from 'mongoose';

export const Region = {
    country: String,
    state: String,
    city: String
};
export const Contact = {
    type : Map,
    of : String
};

export const Profile = {
    firstName : String,
    lastName: String,
    avatar : String,
    birth : Date,
    timezone: String,
    region: Region,

    contact: Contact
};

export const WorkProject = {
    startTime : Date,
    endTime : Date,
    description : String,
    name : String
};

export const WorkAbout = {
    status: String, // employed, student, etc
    employment: String, // company if employed / school if student
    skill : [String],
    project : [WorkProject],
    resume : String,

    notes: String // private internal notes visible only to admin/council
};

// amount is ELA * 1000
export const ELA = {
    address: String,
    amount: Schema.Types.Number
};
export const VotePower = {
    amount: Number,
    expired: Date
};

export const User = {
    username : {
        type : String,
        required: true,
        index : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    salt: {
        type: String,
        required: true
    },

    // let's keep this on the root object
    email: String,
    profile : Profile,
    defaultLanguage: String,
    workAbout : WorkAbout,

    // constants.USER_ROLE
    role : String,
    elaOwed : [ELA],

    notes: String, // private internal notes visible only to admin/council

    // admin or council approved max event budget, defaults to 0
    // decreases upon usage
    elaBudget: [ELA],

    votePower : [VotePower],
    votePowerAmount : {
        // TODO auto calculate with votePower
    },
    active : {
        type : Boolean,
        default : false
    }
};
