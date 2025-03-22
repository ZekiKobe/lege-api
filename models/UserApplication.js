// models/UserApplication.js
const mongoose = require('mongoose');

const userApplicationSchema = new mongoose.Schema({
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
  email: { type: String, required: true },
  relationshipToApplicant: { type: String, required: true },
  contactFullName: { type: String, required: true },
  contactOccupation: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactAddress: { type: String, required: true },
  cityAreaGrewUp: { type: String, required: true },
  motherLanguage: { type: String, required: true },
  speaksOtherLanguages: { type: String, required: true },
  otherLanguages: { type: String },
  reasonToJoin: { type: String, required: true },
  opinionAboutSociety: { type: String, required: true },
  personalIdentification: { type: String, required: true },
  bankAccount: { type: String, required: true },
  passportSizePhoto: { type: String },  // URL or path for uploaded file
  frontImage: { type: String },  // URL or path for uploaded file
  backImage: { type: String },
  registeredAt:{type:Date,default:Date.now()},
  applicationStatus:{type:String,enum:['Pending','Approved','Rejected'],default:"Pending"},
}, { timestamps: true });

const UserApplication = mongoose.model('UserApplication', userApplicationSchema);

module.exports = UserApplication;