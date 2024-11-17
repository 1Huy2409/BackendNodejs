const Product = require("../../models/product.model")
const productsHelper = require("../../helper/product")
module.exports.index = async (req, res) => {
    const find = {
        delete: false,
        status: 'active'
    }
    const product = await Product.find(find);

    // const newProducts = product.map(item => {
    //     return 
    // })
    const newProducts = productsHelper.priceNewProducts(product);
    res.render("../views/client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        product: newProducts
    })
}
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const find = {
        delete: false,
        slug: slug
    }
    const product = await Product.findOne(find);
    res.render('client/pages/products/detail', {
        pageTitle: product.title,
        product: product
    })
}
