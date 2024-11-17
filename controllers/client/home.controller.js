const Product = require("../../models/product.model")
const productsHelper = require("../../helper/product")
module.exports.index = async (req, res) => {
    // đổ ra san pham noi bat
    const productFeatured = await Product.find({
        delete: false,
        featured: "1",
        status: "active"
    }).limit(3);
    //hien thi ra san pham noi bat trong danh sach san pham
    const newProductsFeatured = productsHelper.priceNewProducts(productFeatured);
    res.render("../views/client/pages/home/index", {
        pageTitle: "Trang chủ", //truyen da ta sang file pug roi render file pug
        productFeatured: newProductsFeatured
    }
    )
}