const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {type:String, required:true},
    imageUrl : {type:String, reqquired:true},
    userName : {type:String, reqquired:true},
    userId : {type:String, reqquired:true},
    categoryName: {type:String, reqquired:true},
    categoryId: {type:String, reqquired:true},
    blogDetail: {type:String, reqquired:true},
})

module.exports = mongoose.model('blog', blogSchema)