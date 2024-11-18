// [POST] /cart/add/:productId
const Product = require("../../models/product.model")
const Cart = require("../../models/cart.model")
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const productQuantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if (existProductInCart) {
        //cap nhat lai quantity moi cho product
        const quantityNew = productQuantity + existProductInCart.quantity;
        console.log(quantityNew);
        await Cart.updateOne(
            {_id: cartId,"products.product_id": productId}, {
                $set : {"products.$.quantity": quantityNew}
            }
        )
    }
    else {
        const objectCart = {
            product_id: productId,
            quantity: productQuantity
        }
        //kiem tra productId da ton tai trong products chua, ton tai roi thi tang quantity
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: {products: objectCart}
            }
        )
    }
    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
    res.redirect("back");
}