const User = require("../../models/user.model");
const ForgotPassword = require('../../models/forgot-password.model');
const generateHelper = require("../../helper/generate")
//nhung md5 ma hoa password
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
        //da ton tai email cho tai khoan 
        req.flash("error", "Đã tồn tại tài khoản với email này, vui lòng đăng nhập!");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie('tokenUser', user.tokenUser); //khoi tao tokenUser trong cookie khi dang ky tai khoan
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
    if (!user) { //ton tai email cho tai khoan nay
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
    res.redirect("/");
}
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    })
}
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    
    // tìm xem tồn tại user đó hay không
    const user = await User.findOne({
        email: email,
        delete: false
    });
    // check email tồn tại hay không
    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect('back');
        return;
    }

    // Lưu thông tin vào DB
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: new Date(Date.now()) // thời gian hiện tại cộng với giây
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    res.send("ok");
}
module.exports.logout = async (req, res) => {
    res.clearCookie('tokenUser');
    res.redirect("/");
}
