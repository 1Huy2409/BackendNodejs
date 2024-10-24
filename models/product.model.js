const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        delete: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
        position: Number,
        slug: { type: String, slug: "title", unique: true }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema, "products")

module.exports = Product;