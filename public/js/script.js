const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    //lay ra nut close alert
    const closeAlert = showAlert.querySelector("[close-alert]")
    setTimeout(function() {
        showAlert.classList.add('alert-hidden')
    }, time)
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add('alert-hidden')
    })
}