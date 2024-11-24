const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
module.exports.chat = async (req, res) => {
    //render ra giao dien chat
    const userId = res.locals.user.id;
    _io.once("connection", (socket) => {
        console.log("a user connected!", socket.id)
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save();
        })
    })
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