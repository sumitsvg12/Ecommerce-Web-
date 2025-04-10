const express=require("express");

const routes=express.Router();

const authctrl=require("../controllers/AdminAuthcontrollers");
const authmodels=require("../models/AdminAuthmodels")

const localstrategy=require("../config/passport-local-strategy")

const passport = require('passport');

const {check}=require("express-validator")


routes.get("/",authctrl.login)
routes.post("/loginform",passport.authenticate('local',{failureRedirect:'/login'}),authctrl.loginform)

routes.get("/header",authctrl.header);
routes.get("/adminform",authctrl.adminform);
routes.post("/insertadmin",authmodels.UploadImageFile,authctrl.insertadmin)
routes.get("/viewdata",passport.checkauth,authctrl.viewdata);
routes.get("/deletedata/:id",authctrl.deletedata);
routes.get("/updatedata",authctrl.updatedata);
routes.post("/editdata",authmodels.UploadImageFile,authctrl.editdata);

routes.get("/userprofile",passport.checkauth,authctrl.userprofile)
routes.get("/logout", authctrl.logout);

routes.get("/changepassword", authctrl.changepassword)

routes.post("/setnewpassword", authctrl.setnewpassword)
routes.get("/checkemail", authctrl.checkemail)
routes.post("/verifyemail", authctrl.verifyemail)
routes.get("/verifyotp", authctrl.verifypage)
routes.post("/verify-otp", authctrl.otpverify);
routes.get("/newpassword", authctrl.newpassword)

routes.post("/passwordchangee", authctrl.passwordchange)
routes.get("/resendotp", authctrl.resendotp);
routes.get('/status',authctrl.status)


module.exports=routes;