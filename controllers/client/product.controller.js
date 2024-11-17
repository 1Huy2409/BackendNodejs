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
    const listSubCategoryId = listSubCategory.map((item) => item.id);
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

    try {
        const find = {
            delete: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        const product = await Product.findOne(find);
        if (product.product_category_id) {
            //ton tai danh muc cho san pham 
            const category = await ProductsCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                delete: false
            })
            product.category = category;
        }
        //tinh lai gia moi cho mot san pham o route detail products
        product.priceNew = productsHelper.priceNewProduct(product);
        res.render('client/pages/products/detail', {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {
        res.redirect("/products");
    }
}
