const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/admin/products.controller")
const storageMulter = require("../../helper/storageMulter")
const multer = require('multer')
const upload = multer({ storage: storageMulter() })
const validate = require('../../validates/admin/product.validate')
// const upload = multer({ dest: './public/uploads/'})
//trang chủ
router.get('/', controller.index) //render ra trang danh sach san pham 
router.patch('/change-status/:status/:id', controller.changeStatus) //dung dau : de truyen data dong
router.patch('/change-multi', controller.changeMulti) //thay doi nhieu san pham 
router.delete('/delete/:id', controller.deleteItem) //xoa tung san pham
router.get('/create', controller.create)
router.post('/create', upload.single('thumbnail'), validate.createPost, controller.createPost)
router.get('/edit/:id', controller.editItem)
//route thay doi san pham 
router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
)
//route xem chi tiết sản phẩm
router.get('/detail/:id', controller.detail)
module.exports = router;    