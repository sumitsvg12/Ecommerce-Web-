const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");

module.exports.add_brand = async (req, res) => {
  try {
    let catData = await category.find({});
    let subcatData = await subcategory.find({});
    let extracatData = await extracategory.find({});
    if (req.isAuthenticated()) {
      res.locals.user = req.user
    return res.render("brand/Add_brand", {
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
    });
  }
  } catch (error) {
    if (error) {
      console.log(error);
      return res.redirect("back");
    }
  }
};

module.exports.view_brand = async (req, res) => {
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
    const perPage = 3;
    let brandData = await brand
      .find({
        $or: [{ brand_name: { $regex: ".*" + search + ".*", $options: "i" } }],
      })
      .limit(perPage)
      .skip(perPage * page)
      .populate(["subcategoryId", "categoryId", "extracategoryId"])
      .exec();
    console.log(brandData);
    let totalbrandData = await brand
      .find({
        $or: [{ brand_name: { $regex: ".*" + search + ".*", $options: "i" } }],
      })
      .countDocuments();
      let activebrand = await brand.find({status:true});
      let deactivebrand = await brand.find({status:false});
      if (req.isAuthenticated()) {
        res.locals.user = req.user
    return res.render("brand/View_brand", {
      brandData: brandData,
      searchValue: search,
      totalDocument: Math.ceil(totalbrandData / perPage),
      currentPage: parseInt(page),
      activebrand,
      deactivebrand

    });
  }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.insert_brand = async (req, res) => {
  try {
    let brandData = await brand.create(req.body);
    if (brandData) {
      console.log("Brand Added Successfully");
      return res.redirect("back");
    } else {
      console.log("Brand is Not Added");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) {
      console.log(error, "Something went Wrong");
    }
  }
};

//IsActive Button
module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await brand.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (active) {
        console.log("Brand Deactived Successfully");
        return res.redirect("back");
      } else {
        console.log("Brand is not Deactived");
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
      let active = await brand.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (active) {
        console.log("Brand actived Successfully");
        return res.redirect("back");
      } else {
        console.log("Brand is not Activated");
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

module.exports.deletebrand = async (req, res) => {
  try {
    let deletData = await brand.findByIdAndDelete(req.params.id);
    if (deletData) {
      console.log("Brand Deleted Successfully");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.updatebrand = async (req, res) => {
  try {
    let brandData = await brand.findById(req.params.id);
    if (req.isAuthenticated()) {
      res.locals.user = req.user
    return res.render("brand/Update_brand", {
      brandData: brandData,
    });
  }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.editbrand = async (req, res) => {
  try {
    if (req.params.id) {
      let updateData = await brand.findByIdAndUpdate(req.params.id, req.body);
      if (updateData) {
        console.log("Brand Updated Successfully");
        return res.redirect("back");
      } else {
        console.log("Brand is not Updated");
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
module.exports.getextracategoryData = async (req, res) => {
  try {
    // console.log(req.body);
    let extraCatData = await extracategory.find({
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
    });
    // console.log(extraCatData);
    let optionData = "<option value=''>-- Select Extra Category --</option>";
    extraCatData.map((v, i) => {
      optionData += `<option value='${v.id}'>${v.extracategory_name}</option>`;
    });
    return res.json(optionData);
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
