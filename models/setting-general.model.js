const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const settingGeneralSchema = new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        phone: String,
        email: String,
        address: String,
        copyright: String
    },
    {
        timestamps: true
    }
)
const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema,"settings-general")

module.exports = SettingGeneral;