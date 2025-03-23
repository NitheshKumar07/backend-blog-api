const express = require('express');
const categorySchema = require('../models/categorySchema');
const checkAuth = require('../middleware/checkAuth');
const jwt = require('jsonwebtoken');
const secretkey = 'iam nitesh';

const router = express.Router();


router.post('/',checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey)

    categorySchema.findOne({title : req.body.title})
    .then(title => {
        if(title){return res.status(401).json({msg : 'category already exists'})}

        const newCategory = new categorySchema({
            userId : verify.userId,
            title : req.body.title,
            imageUrl : req.body.imageUrl
        })
        newCategory.save()
        .then(newlyCategory => res.status(200).json({newCategory : newlyCategory}))
        .catch(err => res.status(500).json({error : err}))

    })
    .catch(err => res.status(500).json({error:err}))
})


router.get('/',checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey)

    categorySchema.find({userId : verify.userId})
    .select("userId title imgUrl")
    .then(caterogries => {
        res.status(200).json({categoryList : caterogries})})
    .catch(err => res.status(500).json({error : err}))
})


router.delete('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    categorySchema.deleteOne({_id : req.params.id, userId : verify.userId})
    .then(deleted => {
        if(deleted.deletedCount === 0 ){return res.status(401).json({msg : 'something went wrong'})}
        res.status(200).json({msg : `deleted succesfully`})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err})
    })
})

router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, secretkey);

    categorySchema.find({_id:req.params.id, userId:verify.userId})
    .then(result => {
        if(result.length === 0){return res.status(400).json({msg:'something went wrong'})}

        categorySchema.findOneAndUpdate({_id:req.params.id, userId:verify.userId}, {
            $set:{
                userId : verify.userId,
                title : req.body.title,
                imageUrl : req.body.imageUrl
            }
        })
        .then(updatedItem => {
            res.status(200).json({msg : 'successfully updated', updatedItem})
        })
        .catch(err => res.status(500).json({error : err}))
    })
    .catch(err => res.status(500).json({error : err}))

})




module.exports = router;