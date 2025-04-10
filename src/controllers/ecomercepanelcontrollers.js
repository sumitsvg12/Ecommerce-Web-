const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");
const cart = require("../models/cart");
const type = require("../models/type")
const brand = require("../models/brand")
const order = require("../models/order");
const Userauth = require("../models/userauthmodels");
var stripe = require("stripe")("sk_test_wFSjCKx4AW07JCc87b2fUwhH00zzjnRSJv");
const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt')

const { setflash } = require("../config/flashmessage");

const { validationResult } = require("express-validator");
const { status } = require("./AdminAuthcontrollers");

module.exports.userecom = async (req, res) => {
  try {
    console.log(req.isAuthenticated());

    // Fetch common data
    let catData = await category.find({ status: true });
    let subcatData = await subcategory.find({ status: true });
    let extracatData = await extracategory.find({ status: true });
    let productData = await product.find({ status: true });

    let cartData = [];
    let totalPro = 0;

    if (req.isAuthenticated()) {
        cartData = await cart.find({ userId: req.user.id }).populate("productId");
        totalPro = cartData.length;
    }

    return res.render("ecommercepage/ecomerceheader", {
        catData,
        subcatData,
        extracatData,
        productData,
        cartData,
        totalPro,
        user: req.user 
    });  
  }
  catch (err) {
    console.log(err);
  }
}
module.exports.productlist = async (req, res) => {
  try {
    let catData = await category.find({ status: true });
    let subcatData = await subcategory.find({ status: true });
    let extracatData = await extracategory.find({ status: true });
    let cartData = await cart.find();

    let productData = await product
      .findById(req.params.id)
      .populate([
        "categoryId",
        "subcategoryId",
        "extracategoryId",
        "brandId",
        "typeId",
      ]);

    if (req.isAuthenticated()) {
      res.locals.user = req.user
    }

    // console.log(productData);
    return res.render("ecommercepage/productlist", {
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
      productData: productData,
      cartData: cartData,
      totalPro: cartData.length,
    });

  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};
module.exports.addProducttocart = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("/userlogin");
    }

    const { productId, quantity } = req.body;

    let incart = await cart.findOne({ productId, userId: req.user.id });
    console.log(incart)

    if (incart) {
      console.log("Product already in cart");
      return res.redirect("back");
    } else {
      await cart.create({ productId, userId: req.user.id, quantity });
      console.log("Product added to cart");
      return res.redirect("back");
    }
  } catch (err) {
    console.error(err);
    return res.redirect("back");
  }
};
module.exports.checkout = async (req, res) => {
  try {
    let catData = await category.find({status: true });
    let subcatData = await subcategory.find({ status: true });
    let extracatData = await extracategory.find({ status: true });
    let cartData = "";
    if (req.isAuthenticated()) {
      cartData = await cart
        .find({ userId: req.user.id})
        .populate("productId");
    }
    let finalTotal = 0;
    let total = 0;
    for (let cart of cartData) {
      total = parseInt(cart.productId.product_price) * parseInt(cart.quantity);
      finalTotal += total;
    }
    //Everythings are in this page
    return res.render("ecommercepage/checkout", {
      cartData: cartData,
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
      finalTotal: finalTotal,
      totalPro: cartData.length,
      user: req.user 
    });
  } catch (err) {
    if (err) {
      console.log(err, "Something went Wrong");
      return res.redirect("back");
    }
  }
};
module.exports.deleteone = async (req, res) => {
  try {
    let cartData = await cart.findByIdAndDelete(req.params.id);
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};
module.exports.DeleteAll = async (req, res) => {
  try {
    await cart.deleteMany({
      userId: req.user.id,
    });
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};
module.exports.productQuantityTotal = async (req, res) => {
  try {
    let cartdata = await cart.findById(req.query.id);
    if (cartdata) {
      cartdata.quantity = req.query.qua;
      let editData = await cart.findByIdAndUpdate(req.query.id, cartdata);
      if (editData) {
        let newData = await cart
          .findById(req.query.id)
          .populate("productId")
          .exec();
        let totalprice = newData.productId.product_price * newData.quantity;
        let jsonData = `<span id="proTotal-${req.query.pos}">${totalprice}</span>`;
        return res.json(jsonData);
      } else {
        console.log("data not updated");
        return res.redirect("back");
      }
    } else {
      console.log("data Not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
//run 1 time
module.exports.payment = async (req, res) => {
  try {
    var countCart = await cart
      .find({ userId: req.user.id})
      .countDocuments();
    var cartPendingData = await cart
      .find({ userId: req.user.id })
      .populate("productId")
      .exec();
    var cartPendingData2 = await cart
      .find({ userId: req.user.id})
      .populate("productId")
      .exec();
    var sub = 0;
    for (var i = 0; i < cartPendingData2.length; i++) {
      sub =
        sub +
        cartPendingData2[i].quantity *
          cartPendingData2[i].productId.product_price;
    }

    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Gourav Hammad",
        address: {
          line1: "TC 9/4 Old MES colony",
          postal_code: "452331",
          city: "Indore",
          state: "Madhya Pradesh",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: sub, // Charging Rs 25
          description: "Web Development Product",
          currency: "INR",
          customer: customer.id,
        });
      })
      .then(async (charge) => {
        var cartid = [];
        var proid = [];

        cartPendingData.forEach((v, i) => {
          cartid.push(v.id);
          proid.push(v.productId.id);
        });

        req.body.userId = req.user.id;
        req.body.productId = proid;
        req.body.cartId = cartid;

        var or = await order.create(req.body);

        if (or) {
          cartPendingData.map(async (v, i) => {
            await cart.findByIdAndUpdate(v.id);
          });
          return res.redirect("/");
        }
      })
      .catch((err) => {
        console.log(err); // If some error occurs
      });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.home = async (req, res) => {
  try {
    return res.render("ecommercepage/home")
  }
  catch (err) {
    console.log(err);
  }
}
module.exports.usersignup = async (req, res) => {
  try {
    return res.render("ecommercepage/signup", {
      errordata: [],
      old: []
    })
  }
  catch (err) {
    console.log(err);
  }
}
module.exports.insertuser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.render("ecommercepage/signup", {
        errordata: error.mapped(),
        old: req.body
      })
    }
    else {
      console.log(req.body);
      if (req.body.password == req.body.comformpassword) {
        let userlog = await Userauth.create(req.body);
        console.log(userlog)
        if (userlog) {
          req.flash("success", "user regitration success full");

          return res.redirect("/usertlogin")
        }
        else {
          console.log("something is wrong");
          return res.redirect("back");
        }
      }
      else {
        console.log("password and compassword are not match");
        return res.redirect("back");
      }
    }
  }
  catch (err) {
    console.log("password and compassword are not match");
    return res.redirect("back")
  }
}
module.exports.usertlogin = async (req, res) => {
  try {
    return res.render("ecommercepage/userlogin")
  }
  catch (err) {

    return res.redirect("back")
  }
}
module.exports.signinuser = async (req, res) => {
  try {
    return res.redirect("/")
  }
  catch (err) {
    console.log("inavalid detail");
    return res.redirect("back")
  }

}