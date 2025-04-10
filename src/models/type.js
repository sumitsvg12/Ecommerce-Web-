const mongoose = require('mongoose');

const typeschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategory"
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },
    type_name: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:true,
    },
},
{
    timeStamps:true,
  });

const type = mongoose.model("type", typeschema);
module.exports = type;