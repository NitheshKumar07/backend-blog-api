const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const secretkey = 'iam nitesh'; 
// crypto.randomBytes(64).toString('hex');

router.post('/signup', (req, res) => {
    console.log(`sign up requesting...`, req.body);

    userSchema.findOne({email : req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({ msg : 'email already exists' })
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return err.status(500).json({  error : err  });
            }
               
        const newUser = new userSchema({
            // _id : new mongoose.Types.ObjectId,
            userName : req.body.userName,
            email : req.body.email,
            password : hash
        })
        newUser.save()
        .then(result => {
            res.status(200).json({ newUser : result});
        }).catch(err => {
            res.status(500).json({  error : err })
        })
    
        })

    })
    .catch(err => {res.status(500).json({error : err})}) //catch for findOne

})

router.post('/login', (req, res) => {
    console.log('logging request', req.body);

    userSchema.find({email:req.body.email})
    .then(user => {
        if(user.length < 1){return res.status(401).json({msg : 'email or password is wrong'})}
        bcrypt.compare(req.body.password,user[0].password, (err, result) => {
            if(!result){return res.status(401).json({msg : 'email or password is wrong'})}

            const token = jwt.sign({
                userId : user[0]._id,
                userName : user[0].userName,
                email : user[0].email,
            }, secretkey, {expiresIn : '60d'})

            res.status(200).json({
                userId : user[0]._id,
                userName : user[0].userName,
                email: user[0].email,
                token : token
            })
            
        })
    })
    .catch(err => res.status(500).json({error:err}))


})


module.exports = router; 