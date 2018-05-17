import {Schema} from 'mongoose';

export const Region = {
    country: String,
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
    skill : [String],
    project : [WorkProject],
    resume : String
};

export const ELA = {
    address: String,
    amount: Schema.Types.Decimal128
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
    email: String,
    profile : Profile,
    workAbout : WorkAbout,
    role : String,
    elaOwed : [ELA],

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
