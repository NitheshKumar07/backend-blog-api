const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    userId : {type : String, required : true}, 
    userName : {type : String, required : true},
    comment : {type : String, required : true},
    blogId : {type : String, required : true},
    createdAt : {type: Date, default : Date.now()}
})

module.exports = mongoose.model('comment', commentSchema)