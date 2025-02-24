const mongoose=require("mongoose");

const categoryScheme=mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
    }, 
},{
    timestamps:true,
});


const category=mongoose.model("category",categoryScheme);
module.exports= category;