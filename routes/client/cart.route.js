const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/cart.controller")
//trang chủ
router.post('/add/:productId', controller.addPost);
router.get('/', controller.index);
module.exports = router;    