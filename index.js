const express=require("express");

const port=9000;

const path=require("path");

const mongoose = require('mongoose');

// const db=require("./config/mongoose")

mongoose.connect('mongodb+srv://sumitsvg9836:OCYibTjsM16AabZl@cluster0.8lhg9.mongodb.net/ecommercedata').then((res) =>{
    console.log('db is connected')
})
.catch((err) =>{
    console.log(err);
})

const app=express();

const cookieParser= require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const localstrategy=require('./src/config/passport-local-strategy');
const GoogleStrategy = require("./src/config/google_oauth");
const  flash = require('connect-flash');
const flashmessage=require("./config/flashmessage");

app.set("view engine","ejs");
app.set("views",path.join((__dirname,"views")));

app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname,"assets")));

app.use(express.static(path.join(__dirname,"assets/ecommerce")));


app.use(express.urlencoded());


app.use(
    session({
        name:'SUMIT',
        secret: 'svg', // Replace with a secure secret key
        resave: false,             // Prevent resaving unchanged sessions
        saveUninitialized:false,   // Save uninitialized sessions
        cookie: {
             maxAge:1000*60*60
            }, // Use `secure: true` in production with HTTPS
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(flashmessage.setflash);

app.use("/",require("./src/routes/ecomercepanelroutes"));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is runnig on port",port);
})