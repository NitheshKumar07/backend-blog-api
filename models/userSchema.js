const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId, 
    userName : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true}
})

module.exports = mongoose.model('User', userSchema);