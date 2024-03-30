const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    phoneNumber: String,
    address: String,
    email: String,
    password: String,
},{timestamps:true})

module.exports = mongoose.model('User',schema)