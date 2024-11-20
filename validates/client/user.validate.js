module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) { //khong ton tai title cho san pham moi duoc tao 
        req.flash('error', 'Vui lòng nhập họ và tên!');
        res.redirect('back');
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng khởi tạo mật khẩu!')
        res.redirect('back');
    }
    next();
}
module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng khởi tạo mật khẩu!')
        res.redirect('back');
    }
    next();
}