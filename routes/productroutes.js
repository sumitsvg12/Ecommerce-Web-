const express=require("express");

const routes=express.Router();

const Productmodels=require("../models/productmodels");

const productctrl=require("../controllers/productcontrolles");

routes.get('/',productctrl.AddProductPage)
routes.post('/addproduct',Productmodels.ProductImage,productctrl.AddProduct)
routes.get('/ViewProduct',productctrl.ViewProduct)

routes.get('/updateproductpage',productctrl.UpdateProductPage)
routes.post('/updateproduct',Productmodels.ProductImage,productctrl.UpdateProduct)

routes.get('/deleteteproduct',productctrl.DeleteProduct)
routes.get('/productstatus',productctrl.ProductStatus)


module.exports=routes;