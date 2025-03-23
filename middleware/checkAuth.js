const jwt = require('jsonwebtoken');
// const crypto = require("crypto")
const secretkey = 'iam nitesh' 
// crypto.randomBytes(64).toString('hex');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token, secretkey);

        if(verify){next()}
    }

    catch(err){
        res.status(401).json({msg:'please login', error: err})
    }
}