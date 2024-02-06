const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        // This auth middleware is just for decoder of jwt created to jwt provided
        // If Match it will send user object to that api route
        
        const token = req.header('Authorization').replace('Bearer ', '')
        // jwt.verify(token, secrt that is used to create jwt token before)
        const decoded = jwt.verify(token, 'thisisnodejsdev')
        // const decoded = jwt.verify(unsigned, undefined, { algorithms: ['none'] })
        const user = await User.findOne({ _id: decoded._id, 'token': token})

        if(!user){
            throw new Error()
        }
        //Now req.token and req.user are accessble to all route
        req.token =token
        req.user =user
        
        next()
    }catch(e){
        res.status(200).send({status: false, error: 'Please authenticate'})
    }
}

module.exports = auth