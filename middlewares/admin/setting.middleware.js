const SettingGeneral = require("../../models/setting-general.model")
module.exports.setting = async (req, res, next) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
        //tim thay record cua setting thi tao bien local 
        res.locals.settingGeneral = settingGeneral
    }
    next();
}