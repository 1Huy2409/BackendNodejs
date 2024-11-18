const express = require("express");
const router = express.Router(); //tu express goi mot ham Router
const controller = require("../../controllers/client/search.controller");
router.get('/', controller.index);


module.exports = router;