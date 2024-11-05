const Accounts = require("../../models/account.model")
const Roles = require("../../models/roles.model")
const systemConfig = require("../../config/system")
var md5 = require('md5');
const Account = require("../../models/account.model");
module.exports.index = async (req, res) => {
    const find = {
        delete: false
    }
    const records = await Account.find(find).select("-password -token")
    for (let item of records) {
        const role = await Roles.findOne({
            _id: item.role_id,
            delete: false
        })
        item.role = role
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang danh sách tài khoản",
        records: records
    })
}
module.exports.create = async (req, res) => {
    const find = {
        delete: false
    }
    const roles = await Roles.find(find);
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới danh sách tài khoản",
        roles: roles
    })
    //truyen data role ra giao dien create
}
module.exports.createPost = async (req, res) => {
    //kiem tra email da ton tai hay chua
    const emailExist = await Accounts.findOne(
        {
            email: req.body.email,
            delete: false
        }
    )
    if (emailExist) {
        req.flash("error", "Email này đã được tạo tài khoản")
    }
    else {
        req.body.password = md5(req.body.password);
        const records = new Accounts(req.body);
        await records.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}