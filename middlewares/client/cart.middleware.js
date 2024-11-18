const Product = require("../../models/product.model")
const Cart = require("../../models/cart.model")
module.exports.cartId = async (req, res, next) => { //kiem tra xem token khi vao website da ton tai cartId hay chua
    // console.log("cartMiddleware called: ", req.url);
    if (!req.cookies.cartId) {
        //tao gio hang 
        const cart = new Cart(); //tao moi 1 gio hang
        await cart.save();
        const expiresCookie = 1000 * 60 * 60 * 24 * 365;
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiresCookie)})//luu cartId vao cookies
        //set thoi gian het han cho cartId
    }
    else {
        //lay ra thong tin gio hang hien tai
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        cart.totalQuantity = cart.products.reduce((sum, item)=> sum + item.quantity, 0);
        
        res.locals.miniCart = cart;
    }
    next();
}