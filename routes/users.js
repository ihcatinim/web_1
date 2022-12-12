var express = require('express');
var router = express.Router();
var Usercontroller = require('../controller/user.controller')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('')
// });
router.get('/',Usercontroller.getAllUser);
router.get('/login',Usercontroller.getFormLogin);
router.post('/login',Usercontroller.postFormLogin);
router.get('/register',Usercontroller.getFormRegister);
router.post('/register',Usercontroller.postFormRegister);
router.get('/logout', Usercontroller.logout )
// router.post('/delete:id',Usercontroller.postFormDeleteUser);
router.get('/delete/:id',Usercontroller.getFromDeleteUser);
module.exports = router;
