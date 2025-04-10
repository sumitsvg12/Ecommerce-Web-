const mongoose=require("mongoose");

const UserScheme=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
},{
    timeStamps:true,
});


const Userauth=mongoose.model("Userauth",UserScheme);
module.exports= Userauth;