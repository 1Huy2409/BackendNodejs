const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/roles.controller")
const authMiddleware = require("../../middlewares/admin/auth.middlewares")
router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create', controller.createPost)
router.get('/edit/:id', controller.editItem);
router.patch('/edit/:id', controller.editPatch)
router.get('/permission', controller.permission)
router.patch('/permission', controller.editPermission)


module.exports = router