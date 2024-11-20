const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/checkout.controller")
//trang chủ
router.get('/', controller.index);
router.post('/order', controller.order);
router.get('/success/:orderId', controller.success);
module.exports = router;    