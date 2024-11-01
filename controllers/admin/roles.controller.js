const Roles = require("../../models/roles.model");
const systemConfig = require("../../config/system")
module.exports.index = async (req, res) => {
    const find = {
        delete: false
    }
    const roles = await Roles.find(find);
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        roles: roles
    })
}
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Thêm mới nhóm quyền"
    })
}
module.exports.createPost = async (req, res) => {
    // console.log(req.body)
    const roles = new Roles(req.body);
    await roles.save();
    req.flash("success", "Tạo mới sản phẩm thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
module.exports.editItem = async (req, res) => {
    const id = req.params.id;
    const find = {
        delete: false,
        _id: id
    }
    const data = await Roles.findOne(find);
    res.render("admin/pages/roles/edit.pug", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        data: data
    })
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        await Roles.updateOne({ _id: id }, req.body);
        req.flash('success', 'Chỉnh sửa sản phẩm thành công!')
    }
    catch (error) {
        req.flash('error', 'Chỉnh sửa sản phẩm thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`) 
    }
    res.redirect('back')
}