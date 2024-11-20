const User = require("../../models/user.model");

module.exports.tokenUser = async (req, res, next) => {
    //neu co tokenUser trong application thi tra ve thong tin cua user de lam phan header
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false,
            status: "active"
        }).select("-password");
        if (user) {
            res.locals.user = user;
        }
    }
    next();
}