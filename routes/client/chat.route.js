const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/chat.controller");
const roomMiddleware = require("../../middlewares/client/room.middleware");
router.get('/:roomChatId', roomMiddleware.accessRoomChat, controller.chat)

module.exports = router;