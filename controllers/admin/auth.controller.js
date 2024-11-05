const Accounts = require("../../models/account.model")
const systemConfig = require("../../config/system")
var md5 = require('md5');
module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
    })
}
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Accounts.findOne({
        email: email,
        delete: false
    })
    if (!user) { //truong hop khong ton tai bat cu user nao 
        req.flash("error", "Vui lòng nhập chính xác email");
        return;
    }
    if (user.password != md5(password)) {
        req.flash("error", "Sai mật khẩu. Vui lòng nhập lại!");
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản này đã bị khóa")
        return;
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}