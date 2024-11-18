// [POST] /cart/add/:productId
const Product = require("../../models/product.model")
const Cart = require("../../models/cart.model")
const productHelper = require("../../helper/product")
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
module.exports.index = async (req, res) => {
    //truy van ra thong tin cua gio hang 
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })
    console.log(cart);
    if (cart.products.length > 0) {
        for (let product of cart.products) {
            const productId = product.product_id;
            const productInfo = await Product.findOne({
                _id: productId
            }).select("title thumbnail slug price discountPercentage")
            productInfo.priceNew = productHelper.priceNewProduct(productInfo);
            product.totalPrice = product.quantity * productInfo.priceNew
            product.productInfo = productInfo;
        }
    }
    //tinh tong tien cua ca gio hang
    cart.totalPrice = cart.products.reduce((sum, item)=>sum + item.totalPrice,0)
    res.render("client/pages/cart/index", {
        pageTitle: "Trang giỏ hàng",
        cartDetail: cart
    })
}
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({
        _id: cartId
    })
    //xoa san pham bang cach dung ham filter
    // const newProducts = cart.products.filter(item => item.product_id != productId);
    // await Cart.updateOne({_id: cartId,
    //     products: newProducts
    // })
    
    //xoa san pham bang cach pull
    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {products: {product_id: productId}}
    })
    req.flash("success", "Đã xóa sản phẩm thành công!");
    res.redirect("back");
}
//xoa san pham trong gio hang 
