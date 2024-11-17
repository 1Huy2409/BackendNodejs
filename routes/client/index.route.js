const productRouter = require("./product.route")
const homeRouter = require("./home.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
module.exports = (app) => {
    app.use(categoryMiddleware.category) //tat ca cac route phia client luon luon goi den middleware nay

    app.use('/', homeRouter)
    app.use('/products', productRouter)
}