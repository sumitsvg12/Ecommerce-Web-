const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagepath = "../../uploads/Product_image";
const multiImagepath = "../../uploads/Product_multiple_images";

const productschema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
    required: true,
  },
  extracategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extracategory",
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "type",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  old_price: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_size: {
    type: Array,
    required: true,
  },
  product_color: {
    type: Array,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_multiple_image: {
    type: Array,
    required: true,
  },
  status:{
    type:Boolean,
    default:true,
},
},{
  timeStamps:true,
});

const ImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "product_image") {
      cb(null, path.join(__dirname, "..", imagepath));
    } else {
      cb(null, path.join(__dirname, "..", multiImagepath));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Math.random() * 100000000);
  },
});

productschema.statics.uploadProductImage = multer({
  storage: ImageStorage,
}).fields([
  { name: "product_image", maxcount: 1 },
  { name: "product_multiple_image", maxcount: 10 },
]); // Upload Multiple Images

productschema.statics.imagepath = imagepath;
productschema.statics.multiImagepath = multiImagepath;

const product = mongoose.model("product", productschema);
module.exports = product;
