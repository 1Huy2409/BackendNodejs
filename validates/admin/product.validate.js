module.exports.createPost = (req, res, next) => {
    if (!req.body.title) { //khong ton tai title cho san pham moi duoc tao 
        req.flash('error', 'Vui lòng nhập tiêu đề của sản phẩm muốn tạo!');
        res.redirect('back');
        return;
    }
    next();
}