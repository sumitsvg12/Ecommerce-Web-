const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategory_name: {
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

const subcategory = mongoose.model("subcategory", subcategoryschema);
module.exports = subcategory;