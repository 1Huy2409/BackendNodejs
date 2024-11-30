const productRouter = require("./product.route")
const homeRouter = require("./home.route")
const searchRouter = require("./search.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const cartRouter = require("./cart.route")
const checkoutRouter = require("./checkout.route")
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");
const usersRouter = require("./users.route");
const roomChatRouter = require("./rooms-chat.route")
const userMiddleware = require("../../middlewares/client/user.middleware");
const authMiddleware = require("../../middlewares/client/auth.middleware");
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)
    app.use(userMiddleware.tokenUser);
    app.use('/', homeRouter)
    app.use('/products', productRouter)
    app.use('/search', searchRouter)
    app.use('/cart', cartRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/user', userRouter)
    app.use("/chat", authMiddleware.requireAuth,chatRouter);
    app.use("/users", authMiddleware.requireAuth, usersRouter);
    app.use("/rooms-chat", authMiddleware.requireAuth, roomChatRouter);
}