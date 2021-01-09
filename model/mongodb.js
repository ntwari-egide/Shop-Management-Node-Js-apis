const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/Shop_manag_db',{
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
.then(()=> console.log('connected to mongodb successed.........'))
.catch(err => console.log('Failed to connect to the database'))


require('./category.model')
require('./product.model')