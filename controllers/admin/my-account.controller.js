const Accounts = require("../../models/account.model")
const Roles = require("../../models/roles.model")
const systemConfig = require("../../config/system")
var md5 = require('md5');
module.exports.index = async (req, res) => {
    res.render ("admin/pages/my-account/index", {
        pageTitle: "Thông tin cá nhân"
    });
}
//edit personal information
module.exports.editItem = async (req, res) => {
    res.render ("admin/pages/my-account/edit", {
        pageTitle: "Cập nhật thông tin cá nhân"
    })
}
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
    const emailExist = await Accounts.findOne(
        {
            _id: { $ne: id},
            email: req.body.email,
            delete: false
        }
    )
    if (emailExist) {
        req.flash("error", "Email này đã được tạo tài khoản")
    }
    else {
        if (req.body.password) {
            //neu co thay doi ve mat khau
            req.body.password = md5(req.body.password)
            console.log("OK");
        }
        else {
            delete req.body.password
        }
        await Accounts.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật thông tin tài khoản thành công")
    }
    res.redirect('back')
}