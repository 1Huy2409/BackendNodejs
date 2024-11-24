module.exports.chat = async (req, res) => {
    //render ra giao dien chat
    _io.on("connection", (socket) => {
        console.log("a user connected!", socket.id)
    })
    res.render("client/pages/chat/index", {
        pageTitle: "Chat"
    })
}