const passport = require("passport");

const localstrategy = require("passport-local").Strategy;

const { setflash } = require("./flashmessage");

const authmodels=require("../models/AdminAuthmodels");
const Userauth=require("../models/userauthmodels");

passport.use(new localstrategy({
    usernameField: "email"
}, async function (email, password, done) {
    let admitdata = await authmodels.findOne({ email: email });
    // console.log(admitdata);
    if (admitdata) {
        if (admitdata.password == password) {
            return done(null, admitdata);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false)
    }
}));
passport.use("user",new localstrategy({
    usernameField: "email"
}, async function (email, password, done) {
    let admitdata = await Userauth.findOne({ email: email });
    console.log(admitdata);
    if (admitdata) {
        if (admitdata.password == password) {
            return done(null, admitdata);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false)
    }
}));

passport.serializeUser(function (user, done) {
     return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
      let adminrecord= await authmodels.findById(id);
      if(adminrecord){
        return done(null,adminrecord);
      }
      else{
        let loguser=await Userauth.findById(id);
        if(loguser){
            return done(null,loguser);
        }
        else{
            return done(null,false);
        }  
      }
});

passport.authuser=function(req,res,next){
    if(req.isAuthenticated()){
       res.locals.user=req.user;
    }
    next();
   
}
passport.checkauth=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/login");
    }
}

module.exports=passport;