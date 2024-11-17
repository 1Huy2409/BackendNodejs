const ProductsCategory = require("../../models/productsCategory.model")
const createTreeHelper = require("../../helper/createTree")
module.exports.category = async (req, res, next) => {
    const productsCategory = await ProductsCategory.find({
        delete: false
    }); //lay ra duoc toan bo danh muc san pham

    const newProductsCategory = createTreeHelper.tree(productsCategory); //phan cap cac danh muc
    res.locals.layoutProductsCategory = newProductsCategory;
    next();
}