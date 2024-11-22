// [GET] /admin/dashboard
const ProductCategory = require("../../models/productsCategory.model")
const Products = require("../../models/product.model")
const Accounts = require("../../models/account.model")
const Users = require("../../models/user.model")
//danh muc san pham
module.exports.dashboard = async (req, res) => {
    const objectDashboard = {
        productCategory : {
            total: 0,
            active: 0,
            inactive: 0
        },
        product : {
            total: 0,
            active: 0,
            inactive: 0
        },
        account : {
            total: 0,
            active: 0,
            inactive: 0
        },
        user : {
            total: 0,
            active: 0,
            inactive: 0
        }
    }
    objectDashboard.productCategory.total = await ProductCategory.countDocuments({delete: false});
    objectDashboard.productCategory.active = await ProductCategory.countDocuments({delete: false}, {status: "active"});
    objectDashboard.productCategory.inactive = await ProductCategory.countDocuments({delete: false}, {status: "inactive"});
    //san pham
    objectDashboard.product.total = await Products.countDocuments({delete: false});
    objectDashboard.product.active = await Products.countDocuments({delete: false}, {status: "active"});
    objectDashboard.product.inactive = await Products.countDocuments({delete: false}, {status: "inactive"});
    //account admin
    objectDashboard.account.total = await Accounts.countDocuments({delete: false});
    objectDashboard.account.active = await Accounts.countDocuments({delete: false}, {status: "active"});
    objectDashboard.account.inactive = await Accounts.countDocuments({delete: false}, {status: "inactive"});
    //account user
    objectDashboard.user.total = await Users.countDocuments({delete: false});
    objectDashboard.user.active = await Users.countDocuments({delete: false}, {status: "active"});
    objectDashboard.user.inactive = await Users.countDocuments({delete: false}, {status: "inactive"});
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        objectDashboard: objectDashboard
    })
}