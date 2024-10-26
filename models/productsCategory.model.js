const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsCategorySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        parent_id: {
            type: String,
            default: ""
        },
        discountPercentage: Number,
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
const ProductsCategory = mongoose.model('ProductsCategory', productsCategorySchema, "products-category")

module.exports = ProductsCategory;