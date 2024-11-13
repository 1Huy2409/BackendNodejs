const Accounts = require("../../models/account.model")
const Roles = require("../../models/roles.model")
const systemConfig = require("../../config/system")
var md5 = require('md5');
const system = require("../../config/system");
module.exports.index = async (req, res) => {
    const find = {
        delete: false
    }
    const records = await Accounts.find(find).select("-password -token")
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
        rolesAccount: roles
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
module.exports.editItem = async (req, res) => {
    let find = {
        _id: req.params.id,
        delete: false
    }
    try {
        const account = await Accounts.findOne(find);
        const role = {
            delete: false
        }
        const roles = await Roles.find(role);
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa thông tin tài khoản",
            rolesAccount: roles,
            account: account
        })
    }
    catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
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