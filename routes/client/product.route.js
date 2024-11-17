const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/product.controller");
router.get('/', controller.index)
router.get('/:slugCategory', controller.category)
//router dan den chi tiet san pham ben client
router.get('/detail/:slug', controller.detail)


module.exports = router;