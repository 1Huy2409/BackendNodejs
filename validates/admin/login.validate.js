module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) { //khong ton tai title cho san pham moi duoc tao 
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect('back');
        return;
    }
    next();
}