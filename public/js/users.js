// chức năng gửi lời mời kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", userId)
        })
    })
}

// chức năng xem lời mời đã gửi, hủy lời mời đã gửi
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
// chức năng xóa lời mời kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
//chức năng chấp nhận lời mời kết bạn 
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
    })
}

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUserAccept = document.querySelector(`[badge-users-accept = '${data.userIdB}']`);
    if (badgeUserAccept) {
        //set lai gia tri innerHtml 
        badgeUserAccept.innerHTML = `${data.acceptFriendLength}`;
    }
})
// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUserAccept = document.querySelector(`[data-users-accept = "${data.userIdB}"]`);
    if (dataUserAccept) {
        const boxAccept = document.createElement("div");
        boxAccept.classList.add("col-6");
        boxAccept.setAttribute("user-id", `${data.infoUserA._id}`)
        boxUserA.innerHTML = `
            <div class="box-user">
                <div class="inner-avatar">
                <img src="https://robohash.org/hicveldicta.png" alt="${data.infoUserA.fullName}">
                </div>
                <div class="inner-info">
                <div class="inner-name">${data.infoUserA.fullName}</div>
                <div class="inner-buttons">
                    <button 
                    class="btn btn-sm btn-primary mr-1" 
                    btn-accept-friend="${data.infoUserA._id}"
                    >
                    Chấp nhận
                    </button>
                    <button 
                    class="btn btn-sm btn-secondary mr-1" 
                    btn-refuse-friend="${data.infoUserA._id}"
                    >
                    Xóa
                    </button>
                    <button 
                    class="btn btn-sm btn-secondary mr-1" 
                    btn-deleted-friend="" disabled=""
                    >
                    Đã xóa
                    </button>
                    <button 
                    class="btn btn-sm btn-primary mr-1" 
                    btn-accepted-friend="" disabled=""
                    >
                    Đã chấp nhận
                    </button>
                </div>
                </div>
            </div>
            `;
        dataUserAccept.appendChild(boxAccept);
        //bat su kien cho nut chap nhan
        const btnAcceptFriend = boxAccept.querySelector("[btn-accept-friend]");
        if (btnAcceptFriend) {
            btnAcceptFriend.addEventListener("click", () => {
                btnAcceptFriend.closest(".box-user").classList.add("accepted");
                const userIdA = btnAcceptFriend.getAttribute("btn-accept-friend");
                socket.emit("CLIENT_ACCEPT_FRIEND", userIdA);
            })
        }
        //bat su kien cho nut xoa ket ban
        const btnRefuseFriend = boxAccept.querySelector("[btn-refuse-friend]");
        if (btnRefuseFriend) {
            btnRefuseFriend.addEventListener("click", () => {
                btnRefuseFriend.closest(".box-user").classList.add("refuse");
                const userIdA = btnRefuseFriend.getAttribute("btn-refuse-friend");
                socket.emit("CLIENT_REFUSE_FRIEND", userIdA);
            })
        }
    }
})
// END SERVER_RETURN_INFO_ACCEPT_FRIEND


// SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND", (data) => {
    const dataUserAccept = document.querySelector(`[data-users-accept = "${data.userIdB}"]`);
    if (dataUserAccept) {
        //tim boxAccept co user-id = data.userIdA
        const boxAccept = dataUserAccept.querySelector(`[user-id = "${data.userIdA}"]`);
        if (boxAccept) {
            dataUserAccept.removeChild(boxAccept);
        }
    }
})
// END SERVER_RETURN_ID_CANCEL_FRIEND

// SERVER_RETURN_ID_ACCEPT_FRIEND
socket.on("SERVER_RETURN_ID_ACCEPT_FRIEND", (data) => {
    const dataNotUserAccept = document.querySelector(`[data-not-user-accept = "${data.userIdB}"]`);
    if (dataNotUserAccept) {
        const boxRemove = dataNotUserAccept.querySelector(`[user-id = "${data.userIdA}"]`);
        if (boxRemove) {
            dataNotUserAccept.removeChild(boxRemove);
        }
    }
})
// END SERVER_RETURN_ID_ACCEPT_FRIEND

// SERVER_RETURN_USER_STATUS_ONLINE
socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
    const dataUserFriendList = document.querySelector("[data-user-friendList]");
    if (dataUserFriendList) {
        const boxStatus = dataUserFriendList.querySelector(`[user-id = "${data.userId}"]`);
        if (boxStatus) {
            boxStatus.querySelector("[status]").setAttribute("status", `${data.status}`);
        }
    }
})
// END_SERVER_RETURN_USER_STATUS_ONLINE