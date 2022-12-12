var express = require('express');
var router = express.Router();


var ProductController = require('../controller/product.controller');
//const {route} = require("express/lib/router");

router.get('/',ProductController.getListProduct);
router.get('/add',ProductController.getFormAddProduct);
router.post('/add',ProductController.postFormAddProduct);

router.get('/edit/:id', ProductController.getFormEditProduct);
router.post('/edit/:id',ProductController.postFromEditProduct);

router.get('/delete/:id',ProductController.getFromDeleteProduct);
router.post('/delete/:id',ProductController.postFormDeleteProduct);
module.exports = router;