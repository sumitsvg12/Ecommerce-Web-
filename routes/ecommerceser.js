const express=require("express");

const routes=express.Router();

const userpanelcontrl=require("../controllers/ecomercepanelcontrollers");

const localstrategy=require("../config/passport-local-strategy")

const Userauth=require("../models/userauthmodels")

const passport = require('passport');

const {check}=require("express-validator")

routes.get("/",userpanelcontrl.userecom);
routes.get("/home",userpanelcontrl.home);

routes.get("/usersignup",userpanelcontrl.usersignup);
routes.post("/insertuser",userpanelcontrl.insertuser)
routes.get("/usertlogin",userpanelcontrl.usertlogin);
routes.post("/signinuser",passport.authenticate('user',{failureRedirect:'/usertlogin'}),userpanelcontrl.signinuser)
routes.use('/login',require('./authroutes'))
routes.use('/category',require("./category"));
routes.use("/product",require("./productroutes"));
module.exports=routes;
