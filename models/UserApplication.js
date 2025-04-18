// models/UserApplication.js
const mongoose = require('mongoose');

const userApplicationSchema = new mongoose.Schema({
    userUUID: { type: String, unique: true, required: true },  // 8-digit numeric UUID field
    fullName: { type: String, required: true },
    motherFullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    cityOfBirth: { type: String, required: true },
    occupation: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    numberOfChildren: { type: Number, required: true },
    religion: { type: String, required: true },
    nationality: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String},
    relationshipToApplicant: { type: String},
    contactFullName: { type: String},
    contactOccupation: { type: String},
    contactPhone: { type: String},
    contactAddress: { type: String},
    cityAreaGrewUp: { type: String, required: true },
    motherLanguage: { type: String, required: true },
    speaksOtherLanguages: { type: String},
    otherLanguages: { type: String },
    reasonToJoin: { type: String },
    opinionAboutSociety: { type: String},
    personalIdentification: { type: String, required: true },
    bank:{type:String, required:true},
    bankAccount: { type: String, required: true },
    passportSizePhoto: { type: String },
    frontImage: { type: String },
    backImage: { type: String },
    registeredAt: { type: Date, default: Date.now },
    applicationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: "Pending" },
}, { timestamps: true });

const UserApplication = mongoose.model('UserApplication', userApplicationSchema);

module.exports = UserApplication;
