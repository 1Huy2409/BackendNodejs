const User = require("../../models/user.model");
module.exports = (res) => {
    const myUserId = res.locals.user.id; //id cua chinh minh
    _io.once("connection", async (socket)=> {
        //socket add friend from client to server
        socket.on("CLIENT_ADD_FRIEND", async (userId)=> {
            //push myUserId (yourself) to acceptFriend of user B
            const existAInB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if (!existAInB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {acceptFriends: myUserId}
                })
            }
            //luu id cua B vao requestFriend cua A
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })
            if (!existBinA) {
                await User.updateOne(
                    {_id: myUserId},
                    {$push: {requestFriends: userId}}
                )
            }
            //return event => update accept.length for B account
            const infoUserB = await User.findOne({
                _id: userId
            })
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",
                {
                    userIdB: infoUserB.id,
                    acceptFriendLength: infoUserB.acceptFriends.length
                }
            )
            const infoUserA = await User.findOne({
                _id: myUserId
            }).select("id avatar fullName")
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", 
                {
                    infoUserA: infoUserA,
                    userIdB: userId
                }
            )
            socket.broadcast.emit("SERVER_RETURN_ID_ACCEPT_FRIEND", 
                {
                    userIdA: myUserId,
                    userIdB: userId
                }
            )
        })
        //socket cancel request friend from client to server
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            //xóa id của A trong acpt của B
            const existAInB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if (existAInB) {
                await User.updateOne(
                    {_id: userId},
                    {
                        $pull: {acceptFriends: myUserId}
                    }
                )
            }
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })
            if (existBinA) {
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $pull: {requestFriends: userId}
                    }
                )
            }
            const infoUserB = await User.findOne({
                _id: userId
            })
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", 
                {
                    userIdB: infoUserB.id,
                    acceptFriendLength: infoUserB.acceptFriends.length
                }
            )
            socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND", {
                userIdA: myUserId,
                userIdB: userId
            })
        })
        //socket refuse request from client to server
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const existAInB = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            })
            if (existAInB) {
                await User.updateOne(
                    {_id: userId},
                    {
                        $pull: {requestFriends: myUserId}
                    }
                )
            }
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })
            if (existBinA) {
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $pull: {acceptFriends: userId}
                    }
                )
            }
        })
        //socket accept request from client to server
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const existAInB = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            })
            if (existAInB) {
                await User.updateOne(
                    {_id: userId},
                    {
                        $push: {friendList: {
                            user_id: myUserId,
                            room_chat_id: ""
                        }},
                        $pull: {requestFriends: myUserId}
                    }
                )
            }
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })
            if (existBinA) {
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $push: {friendList: {
                            user_id: userId,
                            room_chat_id: ""
                        }},
                        $pull: {acceptFriends: userId}
                    }
                )
            }
        })
        const myInfo = await User.findOne(
            {_id: myUserId}
        )
        const friendList = myInfo.friendList;
        const friendListId = friendList.map(item => item.user_id);
    })
}