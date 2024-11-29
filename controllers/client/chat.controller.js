const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
module.exports.chat = async (req, res) => {
    const roomChatId = req.params.roomChatId
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    //begin socketio
    _io.once("connection", (socket) => {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({
                room_chat_id: roomChatId,
                user_id: userId,
                content: content
            })
            await chat.save();
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                fullName: fullName,
                userId: userId,
                content: content
            })
        })
        //typing event
        socket.on("CLIENT_SEND_TYPING", async(type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                fullName: fullName,
                userId: userId,
                type: type
            })
        })
        //end typing event
    })
    //end socketio
    const chats = await Chat.find({
        room_chat_id: roomChatId,
        delete: false
    });
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");
        chat.infoUser = infoUser;
    }
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    })
}