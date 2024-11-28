const mongoose = require("mongoose");
const generate = require("../helper/generate.js")
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            unique: true
        },  //token là một chuỗi bất kì, đăng nhập thành công thì lưu token bên phía người dùng
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        statusOnline: String,
        requestFriends: Array, 
        acceptFriends: Array, 
        friendList: [
            {
                user_id: String,
                room_chat_id: String
            }
        ],
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
const User = mongoose.model('User', userSchema, "users")

module.exports = User;