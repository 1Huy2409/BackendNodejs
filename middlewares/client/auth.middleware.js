const User = require("../../models/user.model")
module.exports.requireAuth = async (req, res, next) => {
    //kiem tra co token thoa man chua
    if (!req.cookies.tokenUser) {
        //khong ton tai bat cu token nao duoc gui di khi dang nhap 
        res.redirect('/user/login');
    }
    else {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false
        }).select("-password")
        if (!user) { //TH khong ton tai user nao co token thoa man
            res.redirect('/user/login');
        }
        else {
            res.locals.user = user;
            next();
        }
    }
}