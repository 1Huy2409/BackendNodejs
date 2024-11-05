const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller")

const multer = require('multer')
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const upload = multer()

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', 
    upload.single('avatar'),
    uploadCloud.upload, 
    controller.createPost);
router.get('/edit/:id', controller.editItem);
router.patch('/edit/:id', 
    upload.single('thumbnail'),
    uploadCloud.upload,
    controller.editPatch
);
module.exports = router;