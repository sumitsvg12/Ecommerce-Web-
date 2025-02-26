const Userauth=require("../models/userauthmodels");
const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt')

const { setflash } = require("../config/flashmessage");

const { validationResult } = require("express-validator");

module.exports.userecom=async(req,res)=>{
    try{
        
      return res.render("ecommercepage/ecomerceheader")
    }
    catch(err){
        console.log(err);
    }
}
module.exports.home=async(req,res)=>{
    try{
      return res.render("ecommercepage/home")
    }
    catch(err){
        console.log(err);
    }
}
module.exports.usersignup=async(req,res)=>{
  try{
    return res.render("ecommercepage/signup",{
        errordata: [],
        old: []
    })
  }
  catch(err){
      console.log(err);
  }
}
module.exports.insertuser=async(req,res)=>{
  try{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.render("ecommercepage/signup", {
            errordata: error.mapped(),
            old: req.body
        })
    }
    else{
        console.log(req.body);
        if(req.body.password==req.body.comformpassword){
            let userlog=await Userauth.create(req.body);
            console.log(userlog)
            if(userlog){
                req.flash("success","user regitration success full");
              
                return res.redirect("/usertlogin")
            }
            else{
                console.log("something is wrong");
                return res.redirect("back");
            }
        }
        else{
           console.log("password and compassword are not match");
           return res.redirect("back");
        }
    } 
 }
 catch(err){
    console.log("password and compassword are not match");
     return res.redirect("back")
 }
}
module.exports.usertlogin=async(req,res)=>{
    try{
           return res.render("ecommercepage/userlogin")
    }
    catch(err){
      
       return res.redirect("back")
   }
}
module.exports.signinuser=async(req,res)=>{
    try{
        return res.redirect("/")
     }
     catch(err){
         console.log("inavalid detail");
         return res.redirect("back")
     }
 
}