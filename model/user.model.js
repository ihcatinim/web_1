const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://minhhpn17:minhhpn17@thuc-hanh01.bzsq9uv.mongodb.net/test');

const userSchema = new mongoose.Schema({
    username: 'String',
    passwd:'String',
    email:'String',
});
module.exports = mongoose.model('tb_users',userSchema);