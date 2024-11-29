const RoomChat = require("../../models/room-chat.model");
module.exports.accessRoomChat = async (req, res, next) => {
    const userId = res.locals.user.id;
    const roomChatId = req.params.roomChatId;
    //kiem tra moi room con ton tai user voi userId nay trong do khong, co thi next
    const roomChat = await RoomChat.findOne(
        {
            _id: roomChatId,
            "users.user_id": userId
        }
    )
    if (roomChat) {
        next();
    }
    else {
        res.redirect("/");  
    }
}