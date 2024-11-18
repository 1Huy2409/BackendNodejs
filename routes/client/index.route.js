const productRouter = require("./product.route")
const homeRouter = require("./home.route")
const searchRouter = require("./search.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const cartRouter = require("./cart.route")
module.exports = (app) => {
    app.use(categoryMiddleware.category) //tat ca cac route phia client luon luon goi den middleware nay
    app.use(cartMiddleware.cartId)
    app.use('/', homeRouter)
    app.use('/products', productRouter)
    app.use('/search', searchRouter)
    app.use('/cart', cartRouter);
}