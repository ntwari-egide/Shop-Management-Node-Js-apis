const mongoose = require('mongoose')

var productSchema= new mongoose.Schema({
    name:{
        type: String,
        required: 'this field is required'
    },
    price:{
        type: Number,
        required: 'this field is required'
    },
    categoryId:{
        type: String,
        required: 'this field is required'
    }
})

mongoose.model('Product_Tbl',productSchema)