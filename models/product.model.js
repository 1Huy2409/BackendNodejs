const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        product_category_id:{
            type: String,
            default: ""
        },
        category: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        delete: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date     
            }
        ],
        position: Number,
        slug: { type: String, slug: "title", unique: true }
    },
    {
        timestamps: true //trong timestamps bao gom updateAt va deleteAt
    }
)
const Product = mongoose.model('Product', productSchema, "products")

module.exports = Product;