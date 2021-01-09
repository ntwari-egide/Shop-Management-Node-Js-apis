const express=require('express')
const mongoose=require('mongoose')
const admin=require('../middlewares/admin')
const auth = require('../middlewares/auth')
var router=express.Router();
const Product=mongoose.model('Product_Tbl')

router.post('/',auth,admin,(req,res)=>{
    insertProductToDb(req,res);
})

router.put('/',auth,admin,(req,res)=>{
    updateProductInDb(req,res);
})

function insertProductToDb(req,res){
    let product = new Product();
    product.name=req.body.name;
    product.price=req.body.price;
    product.categoryId=req.body.categoryId;
    product.save()
        .then(insertedProd => res.send(insertedProd).status(201))
        .catch(err => res.send(err).status(400))
}

function updateProductInDb(req,res){
    Product.findOneAndUpdate({_id:req.body._id},
        req.body,{new: true})
        .then(updatedProd => res.send(updatedProd).status(201))
        .catch(err => res.send(err).status(400))
}

router.get('/',(req,res)=>{
Product.find()
    .then(product => res.send(product).status(200))
    .catch(err => res.send(err).status(400))
})

router.get('/bycat/:categoryId',(req,res)=>{
    Product.find({categoryId:req.params.categoryId})
    .then(bycategory => res.send(bycategory).status(200))
    .catch(err => res.send(err).status(404))
})

router.get('/byId/:id',(req,res)=>{
    Product.find({_id:req.params.id})
    .then(byIdProd => res.send(byIdProd).status(200))
    .catch(err => res.send(err).status(404))
})

router.delete('/:id',auth,admin,(req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then(deleteProd => res.send(deleteProd))
    .catch(err => res.send(err).status(404))
})

module.exports=router;