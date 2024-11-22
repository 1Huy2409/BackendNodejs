const SettingGeneral = require("../../models/setting-general.model")
module.exports.general = async(req, res) => {
    res.render("admin/pages/setting/general", {
        pageTitle: "Cài đặt chung"
    })
}
module.exports.generalPatch = async (req, res) => {
    console.log(req.body);
    //khoi tao mot record tu req.body cho model settings-general
    const objectSetting = req.body;
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
        //da ton tai thi update
        await SettingGeneral.updateOne({}, req.body)
    }
    else {
        //chua ton tai thi tao moi
        const settingGeneral = new SettingGeneral(objectSetting);
        settingGeneral.save();
    }
    res.redirect("back");
}