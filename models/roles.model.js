const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const rolesSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        nhomquyen: {
            type: Array,
            default: []
        },
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
const Roles = mongoose.model('Roles', rolesSchema,"roles")

module.exports = Roles;