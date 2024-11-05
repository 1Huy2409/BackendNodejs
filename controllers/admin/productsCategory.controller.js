const ProductsCategory = require("../../models/productsCategory.model")
const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
const createTreeHelper = require("../../helper/createTree")
// const paginationHelper = require("../../helper/pagination")
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
    const find = {
        delete: false
    }
    //bộ lọc danh mục theo trạng thái
    const filterStatus = filterStatusHelper(req.query)
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    const status = req.query.status;
    if (status) {
        find.status = status;
    }
    else {

    }
    //code phần sort danh mục theo tiêu chí
    let mySort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;
        mySort = {
            [sortKey]: sortValue
        }
    }
    const records = await ProductsCategory.find(find).sort(mySort);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/productsCategory/index", {
        pageTitle: "Trang danh mục sản phẩm",
        productCategory: newRecords,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}
module.exports.create = async (req, res) => {
    let find = {
        delete: false
    }
    const records = await ProductsCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/productsCategory/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    })
}
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        let countDocuments = await ProductsCategory.countDocuments();
        req.body.position = parseInt(countDocuments + 1);
    }
    const record = new ProductsCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

module.exports.changeMulti = async (req, res) => {
    //update lai
    const type = req.body.type;
    console.log(type);
    const ids = req.body.ids.split(", ");
    console.log(ids);
    switch (type) {
        case "active":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "delete-all":
            await ProductsCategory.updateMany({ _id: { $in: ids } }, { delete: true, deleteAt: new Date() });
            break;
        case "change-position":
            for (let item of ids) { 
                let [id, position] = item.split("-");
                //cap nhat vi tri moi cho tung item
                position = parseInt(position);
                console.log(position)
                await ProductsCategory.updateOne({ _id: id }, { position: position });
            }
            break;
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}
//code phan button change status
module.exports.buttonChangeStatus = async (req, res) => {
    const id = req.params.id;
    if (req.params.status) {
        const status = req.params.status;
        //update lai cho database
        await ProductsCategory.updateOne({ _id: id }, { status: status });
    }
    else {
        await ProductsCategory.updateOne({ _id: id }, { delete: true });
    }
    res.redirect('back')
}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const find = {
        delete: false,
        _id: id
    }
    const productCategory = await ProductsCategory.findOne(find);
    res.render("admin/pages/productsCategory/detail", {
        pageTitle: productCategory.title,
        product: productCategory
    })
}
module.exports.editItem = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {
            delete: false,
            _id: id
        }
        let find = {
            delete: false
        }
        const productCategory = await ProductsCategory.findOne(data);
        const records = await ProductsCategory.find(find);
        const newRecords = createTreeHelper.tree(records);
        res.render("admin/pages/productsCategory/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            product: productCategory,
            records: newRecords
        })
    }
    catch (error) {
        req.flash("error", "Lỗi chỉnh sửa sản phẩm!");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}
module.exports.editPatch = async (req, res) => {
    req.body.position = parseInt(req.body.position)
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const id = req.params.id;
    console.log(id);
    try {
        await ProductsCategory.updateOne({ _id: id }, req.body);
        req.flash('success', 'Chỉnh sửa sản phẩm thành công!')
    }
    catch (error) {
        req.flash('error', 'Chỉnh sửa sản phẩm thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
    res.redirect('back')
}