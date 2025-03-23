const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const jwt = require('jsonwebtoken');
const commentSchema = require('../models/commentSchema');
const secretkey = 'iam nitesh';
const router = express.Router();

router.post('/post', checkAuth, (req, res) => {
    const token  = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    const newComment = new commentSchema({
        userId : verify.userId,
        userName : verify.userName,
        comment : req.body.comment,
        blogId : req.body.blogId,
    })
    newComment.save()
    .then(comment => res.status(200).json({newComment : comment}))
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})})
})

router.put('/edit/:commentId', checkAuth, (req, res) => {
    const token  = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    commentSchema.findOneAndUpdate({_id : req.params.commentId, userId : verify.userId}, {
        $set : {
            comment : req.body.comment,
        }
    }, {new : true})
    .then(edited => res.status(200).json({editedComment : edited}))
    .catch(err => res.status(500).json({error : err}))
})

router.delete('/delete/:commentId', checkAuth, (req, res) => {
    const token  = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    commentSchema.deleteOne({_id : req.params.commentId, userId : verify.userId})
    .then(result => res.status(200).json({msg : "comment deleted"}))
    .catch(err => res.status(500).json({error : err}))
})

router.get('/blogId/:blogId', checkAuth, (req, res) =>{
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    commentSchema.find({blogId : req.params.blogId})
    .select("userId userName comment blogId")
    .then(comments => res.status(200).json({comments : comments}))
    .catch(err => res.status(500).json({error : err}))
} )



module.exports = router