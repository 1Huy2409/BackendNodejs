const Accounts = require("../../models/account.model")
const Roles = require("../../models/roles.model")
const systemConfig = require("../../config/system")
module.exports.requireAuth = async (req, res, next) => {
    //kiem tra co token thoa man chua
    if (!req.cookies.token) {
        //khong ton tai bat cu token nao duoc gui di khi dang nhap 
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else {
        const user = await Accounts.findOne({
            token: req.cookies.token,
            delete: false
        }).select("-password")
        if (!user) { //TH khong ton tai user nao co token thoa man
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        else {
            const roles = await Roles.findOne({
                _id: user.role_id
            }).select("title permission")
            //ton tai user thoa man
            res.locals.user = user;
            res.locals.roles = roles;
            next();
        }
    }
}