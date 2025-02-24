const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const path = require('path')
const imgpath = '/uploads/Product'

const ProductSchema = mongoose.Schema({
    ProductName:{
        type:String,
        require:true,
    },
    Price:{
        type:String,
        require:true,
    },
    SellingPrice:{
        type:String,
        require:true,
    },
    images:{
        type:String,
        require:true,
    },
    Description:{
        type:String,
        require:true,
    },
    status:{
        type:Boolean,
        default:true
    }   
},{timestamps:true})

const ProductImages= multer.diskStorage({
    destination:(req,res,cd)=>{
        cd(null,path.join(__dirname,'..',imgpath))
    },
    filename:(req,res,cd)=>{
        cd(null,res.fieldname+'-'+Date.now())
    }
})

ProductSchema.statics.ProductImage = multer({storage:ProductImages}).single('images')
ProductSchema.statics.imgpath = imgpath


const Product = mongoose.model('Product',ProductSchema)
module.exports = Product;
