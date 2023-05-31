const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const user_model = mongoose.model('userModel', userSchema);
module.exports = user_model;