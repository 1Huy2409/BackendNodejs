const ProductsCategory = require("../../models/productsCategory.model")
const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
// const paginationHelper = require("../../helper/pagination")
const systemConfig = require("../../config/system")

module.exports.index = async(req, res) => {
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
            [sortKey] : sortValue 
        }
    }
    const record = await ProductsCategory.find(find).sort(mySort);
    res.render("admin/pages/productsCategory/index", {
        pageTitle: "Trang danh mục sản phẩm",
        productCategory: record,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}
module.exports.create = async (req, res) => {
    res.render("admin/pages/productsCategory/create", {
        pageTitle: "Thêm mới danh mục sản phẩm"
    })
}
module.exports.createPost = async(req, res) => {
    if (req.body.position == "") {
        let countDocuments = await ProductsCategory.countDocuments();
        req.body.position = parseInt(countDocuments + 1);
    } 
    const record = new ProductsCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

module.exports.changeMulti = async (req,res) => {
    //update lai
    const type = req.body.type;
    console.log(type);
    const ids = req.body.ids.split(", ");
    console.log(ids);
    switch(type) {
        case "active":
            await ProductsCategory.updateMany({_id: {$in: ids}}, {status: "active"})
            break;
        case "inactive":
            await ProductsCategory.updateMany({_id: {$in: ids}}, {status: "inactive"})
            break;
        case "delete-all":
            await ProductsCategory.updateMany({_id: {$in: ids}}, {delete: true, deleteAt: new Date()});
            break;
        case "change-position":
            for (let item of ids) {
                let [id, position] = item.split("-");
                //cap nhat vi tri moi cho tung item
                position = parseInt(position);
                console.log(position)
                await ProductsCategory.updateOne({_id: id}, {position: position});
            }
            break;
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}