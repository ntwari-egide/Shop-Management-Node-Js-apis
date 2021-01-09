const express=require('express')
const mongoose=require('mongoose')
const admin=require('../middlewares/admin')
const auth = require('../middlewares/auth')
const router=express.Router()
const Categories=mongoose.model('category_tbl')

router.post('/',auth,admin,(req,res)=>{
insertCategory(req,res);
})

router.put('/',auth,admin,(req,res)=>{
    updatingCategory(req,res);
})

function insertCategory(req,res){
var category=new Categories();
category.name= req.body.name;
category.description=req.body.description;
category.save()
    .then(insertCat => res.send(insertCat).status(201))
    .catch(err => res.send(err).status(404))
}

function updatingCategory(req,res){
Categories.findOneAndUpdate({_id:req.body.id})
  .then(updateCat => res.send(updateCat).status(200))
  .catch(err => res.send(err).status(404))
}

router.get('/',auth,admin,(req,res)=>{
Categories.find()
    .then(category => res.send(category).status(200))
    .catch(err => res.send(err).status(400))
})

router.delete('/:id',auth,admin,(req,res)=>{
Categories.findByIdAndRemove(req.params.id)
    .then(deleteProd => res.send(deleteProd))
    .catch(err => res.send(err).status(404))
})

router.get('/byId/:id',(req,res)=>{
Categories.findById({id:req.params.id})
    .then(byId => res.send(byId).status(200))
    .catch(err => res.send(err).status(404))
})

module.exports=router;