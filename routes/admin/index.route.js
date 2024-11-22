const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route")
const productsCategoryRouter = require("./products-category.route")
const rolesRouter = require("./roles.route")
const accountsRouter = require("./accounts.route")
const authRouter = require("./auth.route")
const myAccountRouter = require("./my-account.route")
const settingRouter = require("./setting.route")
const authMiddleware = require("../../middlewares/admin/auth.middlewares")
const systemConfig = require("../../config/system")
const settingMiddleware = require("../../middlewares/admin/setting.middleware")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(settingMiddleware.setting)
    app.use( PATH_ADMIN+'/dashboard', authMiddleware.requireAuth, dashboardRouter)
    app.use( PATH_ADMIN+'/products', authMiddleware.requireAuth, productsRouter)
    app.use( PATH_ADMIN+'/products-category', authMiddleware.requireAuth, productsCategoryRouter)
    app.use( PATH_ADMIN+'/roles', authMiddleware.requireAuth, rolesRouter)
    app.use( PATH_ADMIN+'/accounts', authMiddleware.requireAuth, accountsRouter)
    app.use( PATH_ADMIN+'/auth', authRouter)
    app.use( PATH_ADMIN+'/my-account', authMiddleware.requireAuth, myAccountRouter);
    app.use(PATH_ADMIN + '/settings', authMiddleware.requireAuth, settingRouter)
}