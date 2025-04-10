const express=require("express");

const routes=express.Router();

const ecomctrl=require("../controllers/ecomercepanelcontrollers");

const localstrategy=require("../config/passport-local-strategy");

const passport = require('passport');

routes.get("/",ecomctrl.userecom);
routes.get("/productlist/:id", ecomctrl.productlist);
routes.post("/user", async (req, res) => {
    return res.redirect("/usertlogin");
  });
  
routes.get("/usertlogin",ecomctrl.usertlogin);
routes.get("/usersignup",ecomctrl.usersignup);
routes.post("/addProducttocart",ecomctrl.addProducttocart)
routes.post("/signinuser",passport.authenticate('user',{failureRedirect:'/usertlogin'}),ecomctrl.signinuser);
routes.post("/insertuser",ecomctrl.insertuser)
routes.get("/userlogout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/usertlogin");
});
routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/userlogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

routes.get("/checkout", ecomctrl.checkout);

routes.get("/deleteone/:id", ecomctrl.deleteone);

routes.get("/DeleteAll", ecomctrl.DeleteAll);
routes.get("/productQuantityTotal", ecomctrl.productQuantityTotal);
routes.post("/payment",ecomctrl.payment);
routes.use('/login',require('./authroutes'));
routes.use("/category",require("./category"));
routes.use("/brand",require("./brand"));
routes.use("/type",require("./type"));
routes.use("/product", require("./product"));

module.exports=routes;

