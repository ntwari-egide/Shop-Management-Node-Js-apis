const mongoose=require('mongoose')

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: 'The name of category is required'
    },
    description: {
        type: String,
        required: 'The description of category is required'
    }
})

mongoose.model('category_tbl',categorySchema);
