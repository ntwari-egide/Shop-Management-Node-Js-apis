require('./model/mongodb')
const productController = require('./controllers/productControll');
const categoryController=require('./controllers/category');
const userController = require('./controllers/userControll');
const auth = require('./controllers/auth')
const authMiddleware = require('./middlewares/auth')
const config = require('config')

//Import the necessary packages

const express = require('express');
var app = express();
const bodyparser = require('body-parser');
 
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
 
if(!config.get("jwtPrivateKey")){
    console.log('JWT PRIVATE KEY IS NOT DEFINED')
    process.exit(1)
} 

app.get('/', (req, res) => {
    res.send(' ||||||||||    WELCOME TO SHOP MANAGEMENT......  |||||||||');
});

//Set the Controller path which will be responding the user actions
app.use('/api/product',productController);
app.use('/api/category', categoryController);
app.use('/api/users',userController)
app.use('/api/login',auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
 