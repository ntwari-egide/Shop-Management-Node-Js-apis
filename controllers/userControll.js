const hashPassword = require('../utils/hash')
const _= require('lodash')
const express = require('express');
const {User,validate} =  require('../model/user.model')
//Creating a Router
var router = express.Router();
//get all users
router.get('/',async (req,res)=>{
    const users = await User.find().sort({name:1});
    return res.send(users)
});
// get all admins
router.get('/admins', async (req,res)=>{
    const users= await User.find({isAdmin: "true"});
    return res.send(users);
});
// get all non-admins
router.get('/non-admins', async (req,res)=>{
    const users= await User.find({isAdmin: "false"});
    return res.send(users); 
});

router.post('/signup', async (req,res) =>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)
    let user  = await User.findOne({email:req.body.email})
    if(user) return res.send('User already registered').status(400)
   user  =  new User(_.pick(req.body, ['name','email','password','schoolId']))
    const hashed = await hashPassword(user.password)
   user.password = hashed
    await user.save()
    return res.send(_.pick(user, ['_id','name','email','schoolId'])).status(201)
});
module.exports = router;