const express = require("express");

const routes = express.Router();
const typecontroller = require("../controllers/typecontroller");


routes.get("/add_type",  typecontroller.add_type);

routes.get("/view_type", typecontroller.view_type);

routes.post("/insert_type", typecontroller.insert_type);

routes.get("/isActive/:id", typecontroller.isActive);

routes.get("/deActive/:id", typecontroller.deActive);

routes.get("/deletetype/:id", typecontroller.deletetype);

routes.post("/getextbrandData", typecontroller.getBrand);

routes.get("/updatetype/:id", typecontroller.updatetype);

routes.post("/edittype/:id", typecontroller.edittype);

module.exports = routes;
