const mongoose=require("mongoose");

const path=require("path");

const multer=require("multer");
const { type } = require("os");
const { timeStamp } = require("console");

const Imagepath="/uploads";

const panelScheme=mongoose.Schema({
    name:{
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
    city:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    addimage:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
    }

},{
    timeStamps:true,
});

const StorageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..",Imagepath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
})

panelScheme.statics.UploadImageFile=multer({storage:StorageImage}).single("addimage");
panelScheme.statics.imgpath=Imagepath;

const panelmodel=mongoose.model("panelmodel",panelScheme);
module.exports=panelmodel;

