const mongoose = require('mongoose');

const brandschema = mongoose.Schema({
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
    brand_name: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:true,
    }
   
},{
    timeStamps:true,
});

const brand = mongoose.model("brand", brandschema);
module.exports = brand;