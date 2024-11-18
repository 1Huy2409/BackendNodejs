const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/cart.controller")
//trang chủ
router.get('/', controller.index);
router.post('/add/:productId', controller.addPost);
router.get('/delete/:productId', controller.delete);
router.get('/update/:productId/:quantity', controller.update);
module.exports = router;    