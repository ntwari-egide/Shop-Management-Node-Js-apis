//Import the dependencies
const hashPassword = require('../utils/hash')
const bcrypt = require('bcrypt')
const jwt  =  require('jsonwebtoken')
const Joi = require('joi')
const _= require('lodash')
const config = require('config')
const express = require('express');
const {User} =  require('../model/user.model')
//Creating a Router
var router = express.Router();

router.post('/jwt',async (req,res) =>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let user  = await User.findOne({email:req.body.email})
    if(!user) return res.send('Invalid email').status(400)

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send('invalid email or password').status(400)

    return res.send(user.generateAuthToken())
});

router.post('/bcrypt',async (req,res) =>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let user  = await User.findOne({email:req.body.email})
    if(!user) return res.send('Invalid email or password').status(400)

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send('invalid email or password').status(400)
    return res.send(user.generateAuthToken())
   
});
function validate(req){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password:Joi.string().required()
    }
    return Joi.validate(req,schema)
}
module.exports = router;