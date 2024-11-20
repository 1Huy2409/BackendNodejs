const Order = require("../../models/order.model")
const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helper/product")
module.exports.index = async (req, res) => {
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
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)
    res.render("client/pages/checkout/index", {
        pageTitle: "Trang đặt hàng",
        cartDetail: cart
    })
}
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body; //lay ra thong tin dat hang
    //truy van o trong gio hang de lay ra thong tin cua don hang
    const cart = await Cart.findOne({
        _id: cartId
    })
    const products = [];
    for (let product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity,
        }
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("thumbnail title price discountPercentage");
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;
        products.push(objectProduct)
    }
    console.log(cartId);
    console.log(userInfo);
    console.log(products);
    const orderInfo = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }
    const order = new Order(orderInfo);
    await order.save();
    //reset lai mang product trong cart ve rong
    await Cart.updateOne(
        {_id: cartId},
        {products: []}
    )
    res.redirect(`/checkout/success/${order.id}`);
}
module.exports.success = async (req, res) => {
    //begin success flash
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        _id: orderId
    })
    if (order.products.length > 0) {
        for (let product of order.products) {
            const productInfo = await Product.findOne({
                _id: product.product_id
            }).select("title thumbnail")
            product.productInfo = productInfo;
            product.priceNew = productHelper.priceNewProduct(product);
            product.totalPrice = product.quantity * product.priceNew;
        }
    }
    order.totalPrice = order.products.reduce((sum, item)=>sum + item.totalPrice,0)
    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
        order: order
    })
    //end success flash
}