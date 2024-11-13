const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/my-account.controller")
const multer = require('multer')
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const upload = multer()

router.get('/', controller.index);
router.get('/edit', controller.editItem);
router.patch('/edit', 
    upload.single('thumbnail'),
    uploadCloud.upload,
    controller.editPatch);
module.exports = router;