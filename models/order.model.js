const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const orderSchema = new mongoose.Schema(
    {
        // user_id: String, 
        cart_id: String,
        userInfo: {
            fullName: String, 
            phone: String, 
            address: String
        },
        products: [
            {
                product_id: String, 
                price: Number,
                discountPercentage: Number,
                quantity: Number,
            }
        ],
        delete: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true //trong timestamps bao gom updateAt va deleteAt
    }
)
const Order = mongoose.model('Order', orderSchema, "orders")

module.exports = Order;