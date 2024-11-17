const express = require("express");
const multer = require('multer')
const router = express.Router();
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const controller = require("../../controllers/admin/productsCategory.controller")
//can tao mot validate khac cho trang tao moi danh muc san pham
router.get('/', controller.index)
router.get('/create', controller.create)
router.post(
    '/create', 
    upload.single('thumbnail'),
    uploadCloud.upload,
    controller.createPost
)
//form-change-multi route
router.patch('/change-multi', controller.changeMulti);
//button change status
router.patch('/change-status/:id/:status', controller.buttonChangeStatus)
router.patch('/delete/:id', controller.buttonChangeStatus)
//button xem chi tiet san pham
router.get('/detail/:id', controller.detail)
//button chỉnh sửa sản phẩm
router.get('/edit/:id', controller.editItem)
router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    controller.editPatch
)
module.exports = router;   