const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    userId   : {type:String, required : true},
    title    : {type:String, required : true},
    imageUrl : {type:String, required : true}
})

module.exports = mongoose.model('Category', categorySchema)