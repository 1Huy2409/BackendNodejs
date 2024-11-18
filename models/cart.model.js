const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const cartsSchema = new mongoose.Schema(
    {
        user_id: String, //user cua khach hang
        products: [
            {
                product_id: String, 
                quantity: Number
            }
        ]
    },
    {
        timestamps: true //trong timestamps bao gom updateAt va deleteAt
    }
)
const Cart = mongoose.model('Cart', cartsSchema, "carts")

module.exports = Cart;