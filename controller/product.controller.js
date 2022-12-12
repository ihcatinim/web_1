const ProductModel = require('../model/product.model');
//const {response, request} = require("express");

// //exports.getListProduct = (req,res,next)=>{
//
//     res.render('./product/list-product');
// }

exports.getFormAddProduct = (req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    res.render('./product/add-product');

}

exports.postFormAddProduct = (req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    console.log(req.body);

    const objProduct = new ProductModel({
            name: req.body.product_name,
            price: Number(req.body.product_price),
            img:req.body.product_img,
        }
    );
    objProduct.save(function (error) {
        if (error){
            console.log(error);
        }else {
            console.log("");

        }

    });
    res.redirect('/product/');

}
exports.getListProduct = async (req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    var listProduct = await ProductModel.find();
    res.render('./product/list-product',{ListProduct: listProduct});

}
exports.getFormEditProduct= async (req, res, next) => {
    if (!logedIn)
        res.redirect('/user/login')
    console.log(req.params);
    let itemProduct = await ProductModel.findById(req.params.id)
        .exec().catch(function (err) {
            console.log(err)

        });
    console.log(itemProduct)
    if (itemProduct == null) {
        res.send('');
    }
    res.render('./product/edit-product');

}
exports.postFromEditProduct=(req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    console.log(req.body);
    let dieu_kien ={
        _id: req.params.id

    }
    let du_lieu={
        name: req.body.product_name,
        price: Number(req.body.product_price),
        img: req.body.product_img
    }

    ProductModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if(err){
            res.send("Loi cap nhat:"+ err.message)
        }
    })
    res.redirect('/product/');
}
exports.getFromDeleteProduct = async (req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    console.log(req.params)
    let  itemProduct = await ProductModel.findById(req.params.id)
        .exec()
        .catch( function (err){
            console.log(err);
        });
    console.log(itemProduct)
    if (itemProduct==null){

    }
    res.render('./product/delete-product',{itemProduct: itemProduct})
}
exports.postFormDeleteProduct =(req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    let dieu_kien = {
        _id : req.params.id
    }
    ProductModel.deleteOne(dieu_kien,function (err){
        if(err){
            console.log(err)
        }else {
            console.log('xoa thanh cong')
        }
    })
    res.redirect('/product/')
}
