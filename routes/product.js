const express = require("express");
const routes = express.Router();
const product = require("../models/product");
const productcontroller = require("../controllers/productcontroller");

routes.get("/add_product",  productcontroller.add_product);

routes.get("/view_product",  productcontroller.view_product);

routes.post("/insert_product",product.uploadProductImage, productcontroller.insert_product);

routes.get("/isActive/:id", productcontroller.isActive);

routes.get("/deActive/:id", productcontroller.deActive);

routes.get("/deleteproduct/:id", productcontroller.deleteproduct);

routes.post("/getBrandType", productcontroller.getBrandType);

routes.get("/updateproduct/:id", productcontroller.updateproduct);

routes.post( "/editproduct/:id",product.uploadProductImage,productcontroller.editproduct);

module.exports = routes;
