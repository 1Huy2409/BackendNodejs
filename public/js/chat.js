//begin client send message
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    console.log(formSendData);
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = ""
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}
//end client send message

//begin server return message
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    const boxTyping = document.querySelector(".chat .inner-body .inner-list-typing");
    let htmlFullName = ``;
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    }
    else {
        htmlFullName = `<div class = "inner-name">${data.fullName}</div>`;
        div.classList.add("inner-incoming");
    }
    div.innerHTML = `
        ${htmlFullName}
        <div class = "inner-content">${data.content}</div>
    `;
    if (boxTyping) {
        body.insertBefore(div, boxTyping);
    }
    else {
        body.appendChild(div);
    }
    body.scrollTop = body.scrollHeight;
})
//end return message

//begin scroll chat
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//end scroll chat

//show icon chat
const buttonIcon = document.querySelector(".button-icon")
if (buttonIcon) {
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}

let timeOut;
//insert icon into input form
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const input = document.querySelector(".chat .inner-form input[name = 'content']");
    emojiPicker.addEventListener("emoji-click", (event) => {
        console.log(event.detail);
        const icon = event.detail.unicode
        input.value += icon;
        //focus pointer into inputChat
        input.focus();
        const end = input.value.length;
        input.setSelectionRange(end, end);
        //end focus pointer into inputChat
        socket.emit("CLIENT_SEND_TYPING", "show");
        clearTimeout(timeOut);
        //setTimeout sau 3s
        timeOut = setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }, 3000)
    })
}
//end show icon chat    

//input keyup
const inputChat = document.querySelector(".chat .inner-form input[name = 'content']");
inputChat.addEventListener("keyup", () => {
    socket.emit("CLIENT_SEND_TYPING", "show")
    clearTimeout(timeOut);
    //setTimeout sau 3s
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000)
});
//end input keyup

//server return typing
const elementListTyping = document.querySelector(".chat .inner-body .inner-list-typing");
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        //check existTyping
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`[user_id = "${data.userId}"]`)
            if (!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user_id", data.userId);
                boxTyping.innerHTML = `
                        <div class = "inner-name">${data.fullName}</div>
                        <div class = "inner-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                    `;
                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        }
        else {
            const boxTypingRemove = elementListTyping.querySelector(`[user_id = "${data.userId}"]`);
            if (boxTypingRemove) {
                //an boxTyping nay di 
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    })
}
//end server return typing