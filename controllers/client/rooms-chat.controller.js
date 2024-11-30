const User = require("../../models/user.model");
const RoomChat = require('../../models/room-chat.model');
module.exports.index = async (req, res) => {
    const roomList = await RoomChat.find(
        {   
            typeRoom: "group",
            "users.user_id": res.locals.user.id,
            delete: false
        }
    )
    res.render("client/pages/roomChat/index", {
        pageTitle: "Danh sách phòng chat",
        rooms: roomList
    })
}
module.exports.create = async (req, res) => {
    const myUserId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: myUserId,
        delete: false
    })
    const friendList = myUser.friendList;
    for (friend of friendList) {
        const infoUser = await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar")
        friend.infoUser = infoUser
    }
    res.render("client/pages/roomChat/create", {
        pageTitle: "Tạo phòng chat",
        friendList: friendList
    })
}
module.exports.createPost = async (req, res) => {
    const usersId = req.body.usersId;
    const title = req.body.title;
    const dataRoom = {
        title: title, 
        typeRoom: "group", 
        users: [],
    }
    for (let userId of usersId) {
        dataRoom.users.push(
            {
                user_id: userId,
                role: "user"
            }
        )
    }
    dataRoom.users.push(
        {
            user_id: res.locals.user.id,
            role: "superAdmin"
        }
    )
    const roomChat = new RoomChat(dataRoom);
    roomChat.save();
    res.redirect(`/chat/${roomChat.id}`);
}