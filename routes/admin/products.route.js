const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/admin/products.controller")
// const storageMulter = require("../../helper/storageMulter")
const multer = require('multer')
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const upload = multer()
const validate = require('../../validates/admin/product.validate')
// const upload = multer({ dest: './public/uploads/'})
router.get('/', controller.index) 
router.patch('/change-status/:status/:id', controller.changeStatus) 
router.patch('/change-multi', controller.changeMulti)  
router.delete('/delete/:id', controller.deleteItem) 
router.get('/create', controller.create)
router.post(
    '/create', upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost, 
    controller.createPost
)
router.get('/edit/:id', controller.editItem)
router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
)
router.get('/detail/:id', controller.detail)
module.exports = router;    