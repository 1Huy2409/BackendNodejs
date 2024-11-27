const User = require("../../models/user.model")
const usersSocket = require("../../sockets/client/users.socket");
//module danh sách người dùng
module.exports.notFriend = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const acceptFriends = myUser.acceptFriends;
    const requestFriends = myUser.requestFriends;
    const users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } }
        ],
        delete: false,
        status: "active"
    })
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}
//module danh sách yêu cầu đã gửi
module.exports.request = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const acceptFriends = myUser.acceptFriends;
    const requestFriends = myUser.requestFriends;
    const users = await User.find({
        _id: { $in: requestFriends },
        delete: false,
        status: "active"
    }).select("id avatar fullName")
    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi",
        users: users
    })
}
//module chấp nhận kết bạn
module.exports.accept = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        _id: { $in: acceptFriends },
        delete: false,
        status: "active"
    }
    )
    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời kết bạn",
        users: users
    })
}