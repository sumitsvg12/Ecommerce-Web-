const Userauth=require("../models/userauthmodels");
const category = require("../models/categorymodels");
const Subcategory = require("../models/Subcategory");
const ExtraCategry = require("../models/Extracategorymodels");
const Productmodel=require("../models/productmodels");

const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt')

const { setflash } = require("../config/flashmessage");

const { validationResult } = require("express-validator");

module.exports.userecom=async(req,res)=>{
    try{
        let Category = await category.find({ status: "true" })
        let SubCategory = await Subcategory.find({ status: "true" })
        let ExtraCategory = await ExtraCategry.find({ status: "true" })
        let Product = await Productmodel.find({ status: "true" })

      return res.render("ecommercepage/ecomerceheader",{
        Category,
        SubCategory,
        ExtraCategory,
        Product
      })
    }
    catch(err){
        console.log(err);
    }
}
module.exports.home=async(req,res)=>{
    try{
        let Category = await category.find({ status: "true" })
        let SubCategory = await Subcategory.find({ status: "true" })
        let ExtraCategory = await ExtraCategry.find({ status: "true" })
        let Product = await Productmodel.find({ status: "true" })

      return res.render("ecommercepage/home",{
        Category,
        SubCategory,
        ExtraCategory,
        Product
      })
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