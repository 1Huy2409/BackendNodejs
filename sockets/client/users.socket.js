const User = require("../../models/user.model");
module.exports = (res) => {
    _io.once("connection", (socket)=> {
        //socket add friend from client to server
        socket.on("CLIENT_ADD_FRIEND", async (userId)=> {
            const myUserId = res.locals.user.id; //id cua chinh minh
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
        })
        //socket cancel request friend from client to server
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; //id cua A (add B)
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
        })
        //socket refuse request from client to server
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
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
            const myUserId = res.locals.user.id; 
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
            //push userId va room_chat_id = "" vào friendList
            await User.updateOne(
                {_id: myUserId}, 
                {$push: {friendList: {
                    user_id: userId,
                    room_chat_id: ""
                }}}
            )
        })
    })
}