
const authmodels=require("../models/AdminAuthmodels");

const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt')

const { setflash } = require("../config/flashmessage");

const { validationResult } = require("express-validator");

const otptimer = require("otp-timer");

module.exports.header=async(req,res)=>{
    try{
        // console.log(req.isAuthenticated())
        if(req.isAuthenticated()){
             res.locals.user=req.user
             res.render("header")
            } 
         else{
             console.log("you are not authicate")
             return res.redirect("/login");
         }
           
    }
    catch(err){
        console.log(err);
    }
}
module.exports.adminform=async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            res.locals.user=req.user
        res.render("admincrud/form",{
            logedadmindata: req.cookies.admindata,
            errordata: [],
            old: []
        })
    }
    }
    catch(err){
        console.log(err);
    }
}
module.exports.insertadmin=async(req,res)=>{
    try{
            var adminimage = "";
            if (req.file) {
                adminimage = authmodels.imgpath + "/" + req.file.filename;
            }
            req.body.addimage = adminimage;
            req.body.name = req.body.fname + " " + req.body.lname;
            await authmodels.create(req.body);
            req.flash("success","admin data add successfull");
            return res.redirect("back");  
    }
    catch(err){
        console.log(err);
    }
}
module.exports.userprofile=async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            res.locals.user=req.user
            return res.render("admincrud/profile");
           } 
        
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.viewdata=async(req,res)=>{
    try{
        let admindata=await authmodels.find();
        if(req.isAuthenticated()){
            res.locals.user=req.user
        return res.render("admincrud/viewdata", {
            admindata,

        })
    }
    }
    catch (err) {
        console.log("err");
        return res.redirect("back");
    }
}
module.exports.deletedata=async(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    let admindata = await authmodels.findById(id);
    // console.log(admindata);
    if (admindata) {
        try {
            deleteimagepath = path.join(__dirname, "..", admindata.addimage);
            console.log(deleteimagepath)
            await fs.unlinkSync(deleteimagepath);

        }
        catch (err) {
            console.log("something is wrong");
            return res.redirect("back");
        }
    }
    try {
        let dletedata = await authmodels.findByIdAndDelete(id);
        console.log(dletedata);
        if (dletedata) {
            req.flash("success","admin data delete successfull")
            return res.redirect("back");
        }
        else {
            console.log("record not find");
        }
        return res.redirect("back");
    }
    catch (err) {
        console.log("image not found");
        return res.redirect("back");
    }
}


module.exports.updatedata = async (req, res) => {
    var id = req.query.adminid;
    // console.log(id)
    let signleadmin = await authmodels.findById(id);
    // console.log(signleadmin)
    let names = signleadmin.name.split(" ");
    if(req.isAuthenticated()){
        res.locals.user=req.user
    return res.render("admincrud/editdata", {
        signleadmin,
        names,
        logedadmindata: req.cookies.admindata,
    })
}
}
module.exports.editdata=async(req,res)=>{
    var id = req.body.adminid;
    // console.log(id);
    let signleadmin = await authmodels.findById(id);
    // console.log(signleadmin)
    if (req.file) {
        try {
            let oldimagepath = path.join(__dirname, "..", signleadmin.addimage);
            // console.log(oldimagepath);
            await fs.unlinkSync(oldimagepath);
        }
        catch (err) {
            console.log(err);
            return res.redirect("viewdata");
        }
        let newimagepath = authmodels.imgpath + '/' + req.file.filename;
        req.body.addimage = newimagepath;
        req.body.name = req.body.fname + " " + req.body.lname;

        await authmodels.findByIdAndUpdate(req.body.adminid, req.body);
        req.flash("success","admin data update successfull");
        return res.redirect("viewdata");
    }
    else {
        req.body.imagepath = editadmin.addimage;
        await authmodels.findByIdAndUpdate(req.body.adminid, req.body);
        return res.redirect("viewdata");
    }
}
//  crud function end //

//login fuction  start//

module.exports.login = async (req, res) => {
    try {
        
        return res.render("loginform");
    }
    catch (err) {
        console.log("err");
        return res.redirect("back");
    }
}
module.exports.loginform = async (req, res) => {
    try {
        return res.redirect("header");
    }
    catch (err) {
        console.log("inavalid detail");
        return res.redirect("back")
    }
}

//login function end //

// log out function start //


module.exports.logout = async (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (err) {
                return false;
            }
            return res.redirect("/login")
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}

module.exports.changepassword = async (req, res) => {
    try {
        if(req.isAuthenticated()){
            res.locals.user=req.user
        return res.render("changepassword", {
            logedadmindata: req.cookies.admindata,
        })
    }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.setnewpassword = async (req, res) => {
    try {
        let oldpassword = req.user;
        if (oldpassword.password == req.body.currentpassword) {
            if (req.body.currentpassword != req.body.newpassword) {
                if (req.body.newpassword == req.body.confirmpassword) {
                    var editpassword = await authmodels.findByIdAndUpdate(oldpassword._id, { password: req.body.confirmpassword })
                    console.log("password change")
                    req.flash("success","password change  successfull")
                    return res.redirect("/logout");
                }
                else {
                    req.flash("success","new and conform password not match")
                    
                }
            }
            else {
                req.flash("success","current and new password are  match try again...")
              
            }
        }
        else {
            req.flash("success","old and current password not match");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.checkemail = async (req, res) => {
    try {
        return res.render("forgatepage/checkemail")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.verifyemail = async (req, res) => {
    try {
        let forgatedata = await authmodels.find({ email: req.body.email }).countDocuments();
        //   console.log(forgatedata)
        if (forgatedata == 1) {
            let forgatedata = await authmodels.findOne({ email: req.body.email });
            let otp = Math.ceil(Math.random() * 1000000);

            // console.log(forgatedata.email)
            //  console.log(otp)
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "sumitsvg2409@gmail.com",
                    pass: "eskdhutqkzqokfwf",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = await transporter.sendMail({
                from: "sumitsvg2409@gmail.com", // sender address
                to: forgatedata.email, // list of receivers
                subject: "verify email", // Subject line
                html: `your otp is ${otp}`, // html body
            });
            res.cookie("email", forgatedata.email)
            res.cookie("otp", otp)
            req.flash("success","otp sent successfull...");
            return res.redirect("/login/verifyotp");

        }
        else {
            req.flash("success","invalid email");
            return res.redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}

module.exports.verifypage = async (req, res) => {
    try {
        return res.render("forgatepage/verifyotp");
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}

module.exports.otpverify = async (req, res) => {
    try {
        // let verifyotp=req.cookies.otp
        // console.log(verifyotp)

        let userOtp = req.body.otp;
        let cookieOtp = req.cookies.otp;
        if (userOtp === cookieOtp) {
            req.flash("success","otp verify successfull...");
            res.clearCookie('otp'); // Clear OTP cookie after verification
            return res.redirect("/login/newpassword") // Or redirect to the next page
        } else {
            console.log('Invalid OTP.');
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.newpassword = async (req, res) => {
    try {
        return res.render("forgatepage/newpassword")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}

module.exports.passwordchange = async (req, res) => {
    try {
        //  console.log(req.cookies.email);
        //  console.log(req.body);
        let forgateemail = await authmodels.find({ email: req.cookies.email }).countDocuments();
        if (forgateemail == 1) {
            if (req.body.newpassword == req.body.confirmpassword) {
                let verifyemaillast = await authmodels.findOne({ email: req.cookies.email });
                var forgatepasswordchange = await authmodels.findByIdAndUpdate(verifyemaillast._id, { password: req.body.confirmpassword })
                res.clearCookie('email')
                return res.redirect("/login");
            }
            else {
                req.flash("success","new password and conform password is not match");
             
                return res.redirect("back");
            }
        }
        else {
            console.log("invalid email email is not match");
            return res.redirect("back");
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.resendotp = async (req, res) => {
    try {
        let email = req.cookies.email;
        if (!email) {
            return res.redirect("back");
        }
        let forgatedata = await authmodels.findOne({ email });
        let otp = Math.ceil(Math.random() * 1000000);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "sumitsvg2409@gmail.com",
                pass: "eskdhutqkzqokfwf",
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const info = await transporter.sendMail({
            from: "sumitsvg2409@gmail.com", // sender address
            to: forgatedata.email, // list of receivers
            subject: "verify email", // Subject line
            html: `your otp is ${otp}`, // html body
        });
        res.cookie("email", forgatedata.email)
        res.cookie("otp", otp)
        req.flash("success","otp sent successfull");
        return res.redirect("/verifyotp");

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}
// forgate  password function end //

module.exports.status = async(req,res)=>{
    try{
        let status = true
        if(req.query.status){
            status = req.query.status
        }
        let CheckStatus =  await authmodels.findByIdAndUpdate(req.query.id,{status:status})
        if(CheckStatus){
            console.log('status change');
            return res.redirect('back')
        }
        else{
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}