const Product=require("../models/productmodels");

const path = require('path')
const fs = require('fs')
const { query } = require('express')

module.exports.AddProductPage = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.locals.user = req.user
        return res.render('Product/AddProduct')
        }
    }
    catch (err) {
        console.log(err);

        return res.redirect('back')
    }
}

module.exports.AddProduct = async (req, res) => {
    try {
        if (req.file) {
            req.body.images = Product.imgpath + '/' + req.file.filename;
        }

        let ProductCreate = await Product.create(req.body)
        if (ProductCreate) {
            console.log('Product Create Successfully');
            return res.redirect('back')
        }
        else {
            console.log('Product No Create');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);

        return res.redirect('back')
    }
}

module.exports.ViewProduct = async (req, res) => {
    try {
        let ProductData = await Product.find({ status: "true" })
        let deactiveProductData = await Product.find({ status: "false" })
        if (req.isAuthenticated()) {
            res.locals.user = req.user
        return res.render('Product/ViewProduct', {
            ProductData,
            deactiveProductData
        })
    }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}


module.exports.UpdateProductPage = async(req,res)=>{
    try{
        let ProductData = await Product.findById(req.query.id)
        if (req.isAuthenticated()) {
            res.locals.user = req.user
        return res.render('Product/EditProduct',{
            ProductData
        })
    }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateProduct = async(req,res)=>{
    try{
        let ID = req.body.id
        let ProductData = await Product.findById(ID)
        let images = ''
        if(req.file){
            try{
                images = path.join(__dirname,'..',ProductData.images)
                await fs.unlinkSync(images)
            }
            catch(err){
                console.log('new images error');
                return res.redirect('back')
            }
            req.body.images = Product.imgpath+'/'+req.file.filename

            let updateProduct = await Product.findByIdAndUpdate(ID,req.body)
            if(updateProduct){
                console.log('product Updated');
                return res.redirect('back')
            }
            else{
                console.log('something wrong');
                return res.redirect('back')
            }
        }
        else{
            req.body.images = ProductData.images
            let updateProduct = await Product.findByIdAndUpdate(ID,req.body)
            if(updateProduct){
                console.log('product Updated');
                return res.redirect('back')
            }
            else{
                console.log('something wrong');
                return res.redirect('back')
            }
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.DeleteProduct = async (req, res) => {
    try {
        let DeleteProduct = await Product.findByIdAndDelete(req.query.id)

        if (DeleteProduct.images) {
            imgpath = path.join(__dirname, '..', DeleteProduct.images)
            await fs.unlinkSync(imgpath)
        }

        if (DeleteProduct) {
            console.log('product is deleted');
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

module.exports.ProductStatus = async (req, res) => {
    try {
        let status = true;

        if (req.query.status) {
            status = req.query.status
        }

        let ChangeStatus = await Product.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (ChangeStatus) {
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