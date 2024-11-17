const Product = require("../../models/product.model")
const ProductsCategory = require("../../models/productsCategory.model")
const productsHelper = require("../../helper/product")
module.exports.index = async (req, res) => {
    const find = {
        delete: false,
        status: 'active'
    }
    const product = await Product.find(find);
    const newProducts = productsHelper.priceNewProducts(product);
    res.render("../views/client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        product: newProducts
    })
}
module.exports.category = async (req, res) => {
    //tim kiem ra danh muc lon nhat co chua slug category
    const category = await ProductsCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        delete: false
    })
    const getSubCategory = async (parentId) => {
        const subs = await ProductsCategory.find({
            parent_id: parentId,
            delete: false,
            status: "active"
        })
        let allSubs = [...subs];
        for (const sub of allSubs) {
            const childs = await getSubCategory(sub.id);
            allSubs = allSubs.concat(childs);
        }
        return allSubs;
    }
    const listSubCategory = await getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map((item)=> item.id);
    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        status: "active",
        delete: false
    })
    const newProducts = productsHelper.priceNewProducts(products);
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
