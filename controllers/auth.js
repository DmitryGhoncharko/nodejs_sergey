const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
module.exports.login = async function (req,res) {
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        if(req.body.password == candidate.password){
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            },keys.jwt,{expiresIn: 60 * 60})
            res.status(200).json({
                token : `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: "invalid login or password"
            })
        }
    }else {
        res.status(404).json({
            message: "not registered user"
        })
    }
}
module.exports.register = async function (req,res){
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        res.status(409).json({
            message: "email not unique"
        })
    }else {
        const  user = new User({
            email: req.body.email,
            password: req.body.password
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch (error){
            console.log(error)
            res.status(500).json({
                message: "cannot save user in db"
            })
        }
    }
}