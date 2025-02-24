const mongoose = require('mongoose')

const ExtraCategrySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',  
    },
    extracategoryname:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    }
},{
    timestamps:true
})

const ExtraCategry = mongoose.model('ExtraCategory',ExtraCategrySchema)

module.exports = ExtraCategry