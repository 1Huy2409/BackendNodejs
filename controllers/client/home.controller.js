module.exports.index =  (req, res) => {
    res.render("../views/client/pages/home/index", {
        pageTitle: "Trang chủ" //truyen da ta sang file pug roi render file pug
    }
    )
}