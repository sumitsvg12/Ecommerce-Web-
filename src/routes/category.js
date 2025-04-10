const express=require("express");

const routes=express.Router();

const categoryctrl=require("../controllers/categorycontrollers")

//category //
routes.get("/addcategory",categoryctrl.addcategory);
routes.post("/insercategory",categoryctrl.insercategory);
routes.get("/viewcategory",categoryctrl.viewcategory);
routes.get("/deletecatgory",categoryctrl.deletecatgory);
routes.get('/updatecatgorypage', categoryctrl.UpdateCategoryPage);
routes.post('/updatecatgory', categoryctrl.UpdateCategory);
routes.get('/status', categoryctrl.status);

//sub category
routes.get('/subcategorypage', categoryctrl.SubCategoryPage)
routes.post('/subcategory', categoryctrl.AddSubCategory)
routes.get('/viewsubcatgory', categoryctrl.ViewSubCategory)
routes.get('/deletesubcatgory', categoryctrl.DeleteSubCategory)
routes.get('/updatesubcatgorypage', categoryctrl.UpdateSubCategoryPage)
routes.post('/updatesubcatgory', categoryctrl.UpdateSubCategory)
routes.get('/statussubcategory', categoryctrl.StatusSubCategory)
routes.post('/getsubcategory',categoryctrl.GetSubCategory)

// extra category
routes.get('/extracategory', categoryctrl.extracategorypage)
routes.post('/addextracategory', categoryctrl.addextracategory)
routes.get('/ViewExtraCategory', categoryctrl.ViewExtraCategory)
routes.get('/deleteextracatgory', categoryctrl.DeleteextraCategory)
routes.get('/updateextracatgorypage', categoryctrl.UpdateextraCategoryPage)
routes.post('/updateextracatgory', categoryctrl.UpdateextraCategory)
routes.get('/statusextracategory', categoryctrl.StatusextraCategory)


module.exports=routes;