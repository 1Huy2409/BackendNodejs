const User = require("../../models/user.model");
const Cart = require("../../models/cart.model")
const ForgotPassword = require('../../models/forgot-password.model');
const generateHelper = require("../../helper/generate")
const sendEmailHelper = require("../../helper/sendMail");
const md5 = require("md5")
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email
    })
    if (existEmail) {
        req.flash("error", "Đã tồn tại tài khoản với email này, vui lòng đăng nhập!");
        return;
    }
    req.body.password = md5(req.body.password);
    const tokenUser = generateHelper.generateRandomString(20);
    const user = new User({
        tokenUser: tokenUser,
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password
    });
    await user.save();
    res.cookie('tokenUser', user.tokenUser);
    await User.updateOne(
        {tokenUser: user.tokenUser},
        {
            statusOnline: "Online"
        }
    )
    //gui socket ve client ve status online
    _io.once("connection", async (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE",
            {
                userId: user.id,
                status: "Online"
            }
        )
    })
    res.redirect("/");
}
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Trang đăng nhập"
    })
}
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        delete: false,
        status: "active"
    })
    if (!user) {
        req.flash("error", "Tài khoản này không tồn tại");
        res.redirect("back");
        return;
    }
    if (md5(req.body.password) !== user.password) {
        req.flash("error", "Mật khẩu sai, vui lòng nhập lại!");
        res.redirect("back");
        return;
    }
    res.cookie('tokenUser', user.tokenUser);
    await User.updateOne(
        {tokenUser: user.tokenUser},
        {
            statusOnline: "Online"
        }
    )
    _io.once("connection", async (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE",
            {
                userId: user.id,
                status: "Online"
            }
        )
    })
    //luu user.id vao userId cua cart collection
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        user_id: user.id
    })
    if (cart) {
        res.cookie("cartId", cart.id);
    }
    else {
        await Cart.updateOne(
            { _id: cartId }, { user_id: user.id }
        )
    }

    res.redirect("/");
}
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    })
}
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        delete: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect('back');
        return;
    }

    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() // thời gian hiện tại cộng với giây
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    const subject = "Email xác minh mật khẩu";
    const html = `Mã OTP để thay đổi mật khẩu của bạn là <b>${otp}</b>. Mã OTP này chỉ có hiệu lực 3 phút!`;
    sendEmailHelper.sendEmail(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
}
module.exports.otpPassword = async (req, res) => {
    //render ra giao dien nhap otp 
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle: "Xác thực mã otp",
        email: email
    })
}
module.exports.otpPasswordPost = async (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;
    const forgotPassword = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if (!forgotPassword) {
        req.flash("error", "Mã otp không hợp lệ, vui lòng nhập lại!");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email: email
    })
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/user/password/reset");
}
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    })
}
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const user = await User.findOne(
        { tokenUser: req.cookies.tokenUser },
    )
    user.password = md5(password);
    res.redirect("/");
}
module.exports.logout = async (req, res) => {
    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        delete: false,
        status: "active"
    })
    await User.updateOne(
        {tokenUser: req.cookies.tokenUser}, 
        {
            statusOnline: "Offline"
        }
    )
    _io.once("connection", async (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE",
            {
                userId: user.id,
                status: "Offline"
            }
        )
    })
    res.clearCookie('tokenUser');
    res.clearCookie('cartId');
    res.redirect("/");
}
module.exports.infoUser = async (req, res) => {
    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    }).select("-password")
    res.render("client/pages/user/infoUser", {
        pageTitle: "Thông tin cá nhân",
        user: user
    })
}