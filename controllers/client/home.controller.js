const Product = require("../../models/product.model")
const productsHelper = require("../../helper/product")
module.exports.index = async (req, res) => {
    // đổ ra san pham noi bat
    const productFeatured = await Product.find({
        delete: false,
        featured: "1",
        status: "active"
    }).limit(3);
    //do ra san pham moi nhat
    const newProductsFeatured = productsHelper.priceNewProducts(productFeatured);
    const productNew = await Product.find({
        delete: false,
        status: "active"
    }).sort({position: "desc"}).limit(6);
    const newProductsNew = productsHelper.priceNewProducts(productNew);
    //hien thi ra san pham noi bat trong danh sach san pham
    res.render("../views/client/pages/home/index", {
        pageTitle: "Trang chủ", //truyen da ta sang file pug roi render file pug
        productFeatured: newProductsFeatured,
        productNew: newProductsNew,
    }
    )
}