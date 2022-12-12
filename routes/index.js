var express = require('express');
// var session = require('express-session');
var router = express.Router();

global.logedIn = false

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
