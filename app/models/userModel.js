const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, required: true, trim: true},
    phone: {type: String, required: true, trim: true,},
    firstName: {type: String, required: true, trim: true, minlength: 2},
    lastName: {type: String, required: true, trim: true, minlength: 2},
    password: {type: String, required: true, trim: true, minlength: 6},
    // password_confirm: {type: String, required: true, trim: true, minlength: 6},
    // avatar:{ data: Buffer, contentType: String }
    avatar:{ type: String, required:true }
})

const User = mongoose.model('user',userSchema);
module.exports = User;