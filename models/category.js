const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category_name: {
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

const category = mongoose.model("category", categoryschema);
module.exports = category;