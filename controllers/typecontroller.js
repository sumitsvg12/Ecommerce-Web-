const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");
const type = require("../models/type");

module.exports.add_type = async (req, res) => {
  let catData = await category.find({});
  let subcatData = await subcategory.find({});
  let extracatData = await extracategory.find({});
  let brandData = await brand.find({});
  if (req.isAuthenticated()) {
    res.locals.user = req.user
  return res.render("Type/Add_type", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    brandData: brandData,
  });
}
};

module.exports.view_type = async (req, res) => {
  try {
    var search = "";
    var page;
    if (req.query.search) {
      search = req.query.search;
    }
    if (req.query.pages) {
      page = req.query.pages;
    } else {
      page = 0;
    }
    const perPage = 2;
    let typeData = await type
      .find({
        $or: [{ type_name: { $regex: ".*" + search + ".*", $options: "i" } }],
      })
      .limit(perPage)
      .skip(perPage * page)
      .populate(["categoryId", "subcategoryId", "extracategoryId", "brandId"])
      .exec();
    let totaltypeData = await type
      .find({
        $or: [{ type: { $regex: ".*" + search + ".*", $options: "i" } }],
      })
      .countDocuments();

      let activetype = await type.find({status:true});
      let deactivetype = await type.find({status:false});
      if (req.isAuthenticated()) {
        res.locals.user = req.user
    return res.render("Type/View_type", {
      typeData: typeData,
      searchValue: search,
      totalDocument: Math.ceil(totaltypeData / perPage),
      currentPage: parseInt(page),
      activetype,
      deactivetype
    });
  }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.insert_type = async (req, res) => {
  try {
    let typeData = await type.create(req.body);
    return res.redirect("back");
  } catch (error) {
    if (error) {
      console.log(error, "Something went Wrong");
    }
  }
};

module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await type.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (active) {
        console.log("Type Deactived Successfully");
        return res.redirect("back");
      } else {
        console.log("Type is not Deactived");
        return res.redirect("back");
      }
    } else {
      console.log("Id not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.deActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await type.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (active) {
        console.log("Type actived Successfully");
        return res.redirect("back");
      } else {
        console.log("Type is not Deactived");
        return res.redirect("back");
      }
    } else {
      console.log("Id not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.deletetype = async (req, res) => {
  try {
    let deletData = await type.findByIdAndDelete(req.params.id);
    if (deletData) {
      console.log("Type Deleted Successfully");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.updatetype = async (req, res) => {
  try {
    let typeData = await type.findById(req.params.id);
    if (req.isAuthenticated()) {
      res.locals.user = req.user
    return res.render("Type/Update_type", {
      typeData: typeData,
    });
  }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.edittype = async (req, res) => {
  try {
    if (req.params.id) {
      let updateData = await type.findByIdAndUpdate(req.params.id, req.body);
      if (updateData) {
        console.log("type Updated Successfully");
        return res.redirect("back");
      } else {
        console.log("type is not Updated");
        return res.redirect("back");
      }
    } else {
      console.log("Id not Found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.getBrand = async (req, res) => {
  var BrandData = await brand.find({ extracategoryId: req.body.extraid });
  var options = `<option value="">--Select--</option>`;
  BrandData.map((v, i) => {
    options += `<option value='${v.id}'>${v.brand_name}</option>`;
  });
  return res.json(options);
};
