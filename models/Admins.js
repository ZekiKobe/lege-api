// models/UserApplication.js
const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    adminFullName: { type: String, required: true },  // 8-digit numeric UUID field
    adminEmail: { type: String, required: true },
    adminUsername:{type:String,required:true},
    adminLoginPassword: { type: String, required: true },
});
const AdminUser = mongoose.model('Admins', AdminUserSchema);

module.exports = AdminUser;
