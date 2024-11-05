const mongoose = require("mongoose");
const generate = require("../helper/generate.js")
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generate.generateRandomString(20)
        },  //token là một chuỗi bất kì, đăng nhập thành công thì lưu token bên phía người dùng
        phone: String,
        avatar: String, //lưu dưới dạng đường link dưới dạng online của cloudinary
        role_id: String,
        status: String,
        delete: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
    },
    {
        timestamps: true
    }
)
const Account = mongoose.model('Account', accountSchema, "accounts")

module.exports = Account;