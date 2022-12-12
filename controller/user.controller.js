var User = require('../model/user.model')
var bcrypt = require('bcrypt');
const ProductModel = require("../model/product.model");


exports.getFormLogin = (req,res,next)=>{
    res.render('./user/login');
}
exports.postFormLogin = async (req, res, next) => {
    console.log("CALLED LOGIN API")
    console.log(req.body);
    var objUser = await User.findOne({username: req.body.username});
    if (objUser) {
        console.log("OBJ USER");
        console.log(objUser);
        var checkPass = await bcrypt.compare(req.body.passwd, objUser.passwd);
        if (checkPass) {
            req.session.userLogin = objUser;
            logedIn = true;
            return res.redirect('/product');
        } else {
            return res.render('./user/login', {msg: '<b>ko ton tai user</b>'})
        }
    } else {
        console.log("USER NOT FOUND")
    }
}

exports.getFormRegister = (req,res,next)=>{
    res.render('./user/register')
}
exports.postFormRegister = async (req,res,next)=>{
    console.log("REGISTER USER ======================")
    console.log(req.body);
    if(req.body.passwd != req.body.passwd2){
        return res.render('./user/register',{msg:'<b>xac nhan pass chua dung</b>'})
    }
    var chuoi_ngau_nhien =  await bcrypt.genSalt(10);
    var my_passwd = await bcrypt.hash(req.body.passwd, chuoi_ngau_nhien);

    var objUser = {
        username: req.body.username,
        passwd: my_passwd,
        email:req.body.email
    };
    await User.create(objUser,function (err){
        if(err){
            console.log(err);
            return res.render('./user/register',{msg:"<b>Loi</b>"})
        }
        console.log("gh CSDL thanh cong");
    });
    res.redirect('/user/login');
}
exports.getAllUser = async (req,res,next) =>{
    if (!logedIn)
        res.redirect('/user/login')

    let userList = await User.find()
    console.log("USER LIST =============")
    console.log(userList)
    res.render('./user/list-user', {ListUser: userList});
}

exports.getFromDeleteUser = async (req,res,next)=>{
    if (!logedIn)
        res.redirect('/user/login')
    console.log("DELETE USER ==============")
    console.log(req.params.id)
    let id = req.params.id

    let user = await User.deleteOne({
        _id: id
    })
    res.redirect('/user/')
}
// exports.postFormDeleteUser =(req,res,next)=>{
//     let dieu_kien = {
//         _id : req.params.id
//     }
//     User.deleteOne(dieu_kien,function (err){
//         if(err){
//             console.log(err)
//         }else {
//             console.log('xoa thanh cong')
//         }
//     })
//     res.redirect('/user/')
// }
exports.logout = (req,res,next)=>{
    logedIn = false;
    res.render('./user/login');
}
