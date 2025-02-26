const express=require("express");

const routes=express.Router();

routes.use('/login',require('./authroutes'));
routes.use("/category",require("./category"));
routes.use("/brand",require("./brand"));
routes.use("/type",require("./type"));

routes.use("/product", require("./product"));

module.exports=routes;

