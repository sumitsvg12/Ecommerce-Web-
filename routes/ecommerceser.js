const express=require("express");

const routes=express.Router();

const ecomctrl=require("../controllers/ecomercepanelcontrollers");

const localstrategy=require("../config/passport-local-strategy");

const passport = require('passport');

routes.get("/",ecomctrl.userecom);
routes.get("/usertlogin",ecomctrl.usertlogin);
routes.get("/usersignup",ecomctrl.usersignup);
routes.post("/signinuser",passport.authenticate('user',{failureRedirect:'/usertlogin'}),ecomctrl.signinuser);
routes.post("/insertuser",ecomctrl.insertuser)
routes.use('/login',require('./authroutes'));
routes.use("/category",require("./category"));
routes.use("/brand",require("./brand"));
routes.use("/type",require("./type"));

routes.use("/product", require("./product"));

module.exports=routes;

