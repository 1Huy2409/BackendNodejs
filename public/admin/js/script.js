const buttonStatus = document.querySelectorAll("[button-status]")
console.log(buttonStatus);
if (buttonStatus.length>0) {
    //khi so luong nut > 0 chay vao kiem tra tung button
    let url = new URL(window.location.href); //lay ra url cua page
    console.log(url)
    buttonStatus.forEach(function(button) {
        button.addEventListener('click', ()=> {
            //lay ra thuoc tinh cua button
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            console.log(url.href)
            //cau lenh de chuyen huong trang web
            window.location.href = url.href;
        })
    })
    //xay dung form tim kiem
    const formSearch = document.querySelector("#form-search")
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        let url = new URL(window.location.href); //lay ra duong link cua current page
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            //ton tai keyword duoc nhap vao
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href;    
        // set key url va value cua key len url 
    })
    //xay dung phan pagination
    const buttonPaginations = document.querySelectorAll("[button-pagination]");
    console.log(buttonPaginations);
    buttonPaginations.forEach(button => {
        let url = new URL(window.location.href);
        button.addEventListener('click', () => {
            //chuyen value cua key button-pagination len url
            const page = button.getAttribute("button-pagination");
            if (page) {
                url.searchParams.set("page", page);
            }
            else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    })
}
//code logic phan preview buc anh 
//begin image
    //tim ra input anh 
    const uploadImage = document.querySelector("[upload-image]")
    if (uploadImage) {
        //tim input va preview
        let uploadImageInput = document.querySelector("[upload-image-input]")
        let uploadImagePreview = document.querySelector("[upload-image-preview]")
        if (uploadImageInput) {
            uploadImageInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) [
                    uploadImagePreview.src = URL.createObjectURL(file)
                ]
            })
        }
    }
//end image
