const mongoose = require('mongoose')

const SubCategorySchema = mongoose.Schema({
    categoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subcatgoryname: {
        type: String,
        required:true,
    },
    status: {
        type: Boolean,
        default:true,
    }
}, { timestamps: true })

const Subcategory = mongoose.model('SubCategory', SubCategorySchema)

module.exports = Subcategory