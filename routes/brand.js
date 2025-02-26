const express = require("express");

const routes = express.Router();
const brandcontroller = require("../controllers/brandcontroller");

routes.get("/add_brand", brandcontroller.add_brand);

routes.get("/view_brand", brandcontroller.view_brand);

routes.post("/insert_brand", brandcontroller.insert_brand);

routes.get("/isActive/:id", brandcontroller.isActive);

routes.get("/deActive/:id", brandcontroller.deActive);

routes.get("/deletebrand/:id", brandcontroller.deletebrand);

routes.post("/getextracategoryData", brandcontroller.getextracategoryData);

routes.get("/updatebrand/:id", brandcontroller.updatebrand);

routes.post("/editbrand/:id", brandcontroller.editbrand);




module.exports = routes;
