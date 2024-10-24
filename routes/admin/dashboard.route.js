const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/admin/dashboard.controller")
//trang chủ
router.get('/', controller.dashboard)

module.exports = router;    