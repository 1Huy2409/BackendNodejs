const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
module.exports.chat = async (req, res) => {
    //render ra giao dien chat
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    //begin socketio
    _io.once("connection", (socket) => {
        console.log("a user connected!", socket.id)
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save();
            _io.emit("SERVER_RETURN_MESSAGE", {
                fullName: fullName,
                userId: userId,
                content: content
            })
        })
    })
    //end socketio
    const chats = await Chat.find({});
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