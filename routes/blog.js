const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const blogSchema = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const secretkey = 'iam nitesh';


router.post('/post-blog', checkAuth, (req, res) =>{
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    blogSchema.findOne({userId:verify.userId})
        const newBlog = new blogSchema({
                userId : verify.userId,
                userName : verify.userName,
                title : req.body.title,
                imageUrl : req.body.imageUrl,
                categoryName : req.body.categoryName,
                categoryId: req.body.categoryId,
                blogDetail:req.body.blogDetail,
        })
        newBlog.save()
        .then(result => {res.status(200).json({newBlog : result})})
        .catch(err => res.status(200).json({error : err}))
})



// get all blogs
router.get('/', checkAuth, (req, res) => {
    blogSchema.find()
    .then(blog => {
        if(blog.length === 0){return res.status(200).json({msg : `no existing blogs`})}
        res.status(200).json({blogsList : blog})
    })
    .catch(err => res.status(500).json({error : err}))
})


// get all blogs by category
router.get('/categoryid/:id', checkAuth,(req,res) => {
   blogSchema.find({categoryId: req.params.id})
    .then(blog => res.status(200).json({blogList : blog}) )
    .catch(err => res.status(500).json({error : err}))
})

// delete by same user
router.delete('/delete-blog/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    blogSchema.deleteOne({_id : req.params.id, userId : verify.userId})
    .then(result => {
        console.log(result);
        if(result.deletedCount === 0) {return res.status(200).json({msg : 'something went wrong'})}
        res.status(200).json({msg : 'blog deleted succesfully'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    })
})

// update by same user
router.put('/update-blog/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    blogSchema.find({_id:req.params.id, userId:verify.userId})
    .then(user => {
        if(user.length === 0){return res.status(401).json({msg : 'sonmething went wrong'})}

        blogSchema.findOneAndUpdate({_id:req.params.id, userId:verify.userId}, {
            $set : {
                title : req.body.title,
                imageUrl : req.body.imageUrl,
                categoryName : req.body.categoryName,
                categoryId: req.body.categoryId,
                blogDetail:req.body.blogDetail,
            }
        }, {new : true} )
        .then(updatedBlog => {
            console.log(updatedBlog);
            res.status(200).json({updatedBlog:updatedBlog})
    })
        .catch(err => {console.log(err)
            res.status(500).json({error : err})
        })
    })
    .catch(err => res.status(500).json({error : err}))})

module.exports = router