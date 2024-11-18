//dua search helper vao 
const searchHelper = require("../../helper/search");
const productsHelper = require("../../helper/product")
const Product = require("../../models/product.model")
module.exports.index = async(req, res) => {
    const keyword = req.query.keyword;
    let find = {
        delete: false,
        status: "active"
    }
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    const products = await Product.find(find);
    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/search/index", {
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    })
}