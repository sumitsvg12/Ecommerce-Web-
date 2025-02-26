const category = require("../models/category");
const Subcategory = require("../models/subcategory");
const ExtraCategry = require("../models/extracategory");
const subcategory = require("../models/subcategory");

module.exports.addcategory = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render("category/addcategory")
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.insercategory = async (req, res) => {
    try {
        let addcategory = await category.create(req.body);
        if (addcategory) {
            console.log("category Added Successfully");
            return res.redirect("back");
        } else {
            console.log("category is Not Added");
            return res.redirect("back");
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.viewcategory = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.locals.user = req.user

            let search = '';
            if (req.query.search) {
                search = req.query.search
            }
            const perPage = 3;
            var page;
            if (req.query.pages) {
                page = req.query.pages
            }
            else {
                page = 0;
            }

            let viewcategory = await category.find({
                $or: [
                    { category_name: { $regex: new RegExp(search, "i") } }
                ],
            }).limit(perPage).skip(perPage * page);

            let totalcatData = await category.find({
                $or: [
                    { category_name: { $regex: new RegExp(search, "i") } }
                ],
            })
                .countDocuments();
            let activeviewcategory = await category.find({ status: "true" });
            let deactiveviewcategory = await category.find({ status: "false" });
            return res.render("category/viewcategory", {
                activeviewcategory,
                deactiveviewcategory,
                viewcategory,
                searchValue: search,
                totalDocument: Math.ceil(totalcatData / perPage),
                currentPage: parseInt(page),

            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.deletecatgory = async (req, res) => {
    try {
        let DeleteCategory = await category.findByIdAndDelete(req.query.id)
        if (DeleteCategory) {
            console.log('category is delete');
            return res.redirect('back')
        }
        else {
            console.log('something is wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateCategoryPage = async (req, res) => {
    try {
        let CategoryData = await category.findById(req.query.id)
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/EditCategory', {
                CategoryData
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateCategory = async (req, res) => {
    try {
        let UpdateCategory = await category.findByIdAndUpdate(req.body.id, req.body)
        if (UpdateCategory) {
            console.log('update category');
            return res.redirect("back")
        }
        else {
            console.log('something is wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.status = async (req, res) => {
    try {
        let status = true
        if (req.query.status) {
            status = req.query.status
        }

        let CheckStatus = await category.findByIdAndUpdate(req.query.id, { status: status })
        if (CheckStatus) {
            console.log('status change');
            return res.redirect('back')
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// sub category 

module.exports.SubCategoryPage = async (req, res) => {
    try {
        let viewcategory = await category.find({ status: "true" });
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/subcategory/AddSubCategory', {
                viewcategory
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.AddSubCategory = async (req, res) => {
    try {
        req.body.status = true;
        let AddSubCategory = await Subcategory.create(req.body)
        if (AddSubCategory) {
            console.log('Sub Category is Added');
            return res.redirect('back')
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.ViewSubCategory = async (req, res) => {
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
        const perPage = 4;
        let subcatData = await Subcategory
            .find({
                $or: [
                    { subcategory_name: { $regex: ".*" + search + ".*", $options: "i" } },
                ],
            })
            .limit(perPage)
            .skip(perPage * page)
            .populate("categoryId")
            .exec(); // Join Tables
        let totalsubcatData = await Subcategory
            .find({
                $or: [
                    { subcategory_name: { $regex: ".*" + search + ".*", $options: "i" } },
                ],
            })
            .countDocuments();
        let activeSubCategory = await Subcategory.find({ status: "true" }).populate('categoryId').exec();
        let detiveSubCategory = await Subcategory.find({ status: "false" }).populate('categoryId').exec();
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/subcategory/viewsubcatgory', {
                activeSubCategory,
                detiveSubCategory,
                subcatData: subcatData,
                searchValue: search,
                totalDocument: Math.ceil(totalsubcatData / perPage),
                currentPage: parseInt(page),
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.DeleteSubCategory = async (req, res) => {
    try {
        let DeleteSubCategory = await Subcategory.findByIdAndDelete(req.query.id)
        if (DeleteSubCategory) {
            console.log('Sub Category is deleted');
            return res.redirect('back')
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateSubCategoryPage = async (req, res) => {
    try {
        let viewcategory = await category.find({ status: "true" });
        let SubCategory = await Subcategory.findById(req.query.id).populate('categoryId').exec()
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/subcategory/EditSubCategory', {
                SubCategory, viewcategory
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateSubCategory = async (req, res) => {
    try {

        let UpdateSubCatgory = await Subcategory.findByIdAndUpdate(req.body.id, req.body).populate('categoryId').exec();
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            if (UpdateSubCatgory) {
                console.log('Sub Categoy Updated');
                return res.redirect('back')
            }
            else {
                console.log('something wrong');
                return res.redirect('back')
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.StatusSubCategory = async (req, res) => {
    try {
        let status = true;

        if (req.query.status) {
            status = req.query.status
        }

        let UpdateStatus = await Subcategory.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (UpdateStatus) {
            console.log('status is change');
            return res.redirect('back')
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.GetSubCategory = async (req, res) => {
    try {
        // console.log(req.body);
        let subcatData = await Subcategory.find({
          categoryId: req.body.categoryId,
        });

        console.log(subcatData);
        let optionData = "<option value=''>-- Select Subcategory --</option>";
        subcatData.map((v, i) => {
          optionData += `<option value='${v.id}'>${v.subcategory_name}</option>`;
        });
        return res.json(optionData);
      } catch (err) {
        console.log(err);
      }
}

//Extra category
module.exports.extracategorypage = async (req, res) => {
    try {
        let Category = await category.find({})
        console.log(category);
        let SubCategory = await Subcategory.find({})
        console.log(subcategory);
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/Extracategory/AddExtraCategory', {
                Category, SubCategory
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.addextracategory = async (req, res) => {
    try {
        req.body.status = true
        let Extracategory = await ExtraCategry.create(req.body)
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            if (Extracategory) {
                console.log('extra category is added');
                return res.redirect('back')
            }
            else {
                console.log('something wrong');
                return res.redirect('back')
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.ViewExtraCategory = async (req, res) => {
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
        const perPage = 4;
        let extracategoryData = await ExtraCategry
          .find({
            $or: [
              {
                extracategory_name: { $regex: ".*" + search + ".*", $options: "i" },
              },
            ],
          }).limit(perPage).skip(perPage * page).populate("subcategoryId").populate("categoryId").exec(); // To Join Multiple Tables
           let totalextracatData = await ExtraCategry
          .find({
            $or: [
              {
                extracategory_name: { $regex: ".*" + search + ".*", $options: "i" },
              },
            ],
          })
          .countDocuments();


        let ExtraCategory = await ExtraCategry.find({ status: true })
            .populate("subcategoryId")
            .populate("categoryId")
            .exec();
        console.log(ExtraCategory);

        let deactiveExtraCategory = await ExtraCategry.find({ status: false }).populate('categoryId').populate('subcategoryId').exec()
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            return res.render('category/Extracategory/ViewExtraCategory', {
                ExtraCategory,
                deactiveExtraCategory,
                extracatData: extracategoryData,
                searchValue: search,
                totalDocument: Math.ceil(totalextracatData / perPage),
                currentPage: parseInt(page),
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.DeleteextraCategory = async (req, res) => {
    try {
        let DeleteExtraCategory = await ExtraCategry.findByIdAndDelete(req.query.id);
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            if (DeleteExtraCategory) {
                console.log('Extra Category is deleted');
                return res.redirect('back')
            }
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateextraCategoryPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.locals.user = req.user
            
        let extracatData = await ExtraCategry.findById(req.query.id);
        return res.render("category/Extracategory/Update_extracategory", {
          extracatData: extracatData,
        });
    }
      } catch (error) {
        console.log(error);
        return res.redirect("back");
      }
}
module.exports.UpdateextraCategory = async (req, res) => {
    try {
       
          let updateData = await ExtraCategry.findByIdAndUpdate(
            req.body.id,
            req.body)
        
          if (updateData) {
            console.log("extracategory Updated Successfully");
            return res.redirect("back");
          } else {
            console.log("extracategory is not Updated");
            return res.redirect("back");
          }
          
      } catch (error) {
        console.log(error);
        return res.redirect("back");
      }
}

module.exports.StatusextraCategory = async (req, res) => {
    try {
        let status = true;

        if (req.query.status) {
            status = req.query.status
        }

        let UpdateStatus = await ExtraCategry.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (UpdateStatus) {
            console.log('status is change');
            return res.redirect('back')
        }
        else {
            console.log('something wrong');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}