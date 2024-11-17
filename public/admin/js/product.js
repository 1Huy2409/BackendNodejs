// // const { findOneAndReplace } = require("../../../models/product.model");
// const buttonStatus = document.querySelectorAll("[button-status]")
// if (buttonStatus.length > 0) {
//     //khi so luong nut > 0 chay vao kiem tra tung button
//     let url = new URL(window.location.href); //lay ra url cua page
//     console.log(url)
//     buttonStatus.forEach(function (button) {
//         button.addEventListener('click', () => {
//             //lay ra thuoc tinh cua button
//             const status = button.getAttribute("button-status");
//             if (status) {
//                 url.searchParams.set("status", status);
//             }
//             else {
//                 url.searchParams.delete("status");
//             }
//             console.log(url.href)
//             //cau lenh de chuyen huong trang web
//             window.location.href = url.href;
//         })
//     })
//     //xay dung form tim kiem
//     const formSearch = document.querySelector("#form-search")
//     formSearch.addEventListener("submit", (e) => {
//         e.preventDefault();
//         let url = new URL(window.location.href); //lay ra duong link cua current page
//         const keyword = e.target.elements.keyword.value;
//         if (keyword) {
//             //ton tai keyword duoc nhap vao
//             url.searchParams.set("keyword", keyword);
//         }
//         else {
//             url.searchParams.delete("keyword")
//         }
//         window.location.href = url.href;
//         // set key url va value cua key len url 
//     })
//     //xay dung phan pagination
//     const buttonPaginations = document.querySelectorAll("[button-pagination]");
//     console.log(buttonPaginations);
//     buttonPaginations.forEach(button => {
//         let url = new URL(window.location.href);
//         button.addEventListener('click', () => {
//             //chuyen value cua key button-pagination len url
//             const page = button.getAttribute("button-pagination");
//             if (page) {
//                 url.searchParams.set("page", page); 
//             }
//             else {
//                 url.searchParams.delete("page");
//             }
//             window.location.href = url.href;
//         })
//     })
// }
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
// const formChangeMulti = document.querySelector("[form-change-multi]")
// console.log(formChangeMulti);   //log ra formChangeMulti
// if (formChangeMulti) {
//     formChangeMulti.addEventListener('submit', (e) => {
//         e.preventDefault();
//         //can dua id cua nhung item duoc checked len form name ids duoi dang mot text
//         const inputsChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked")
//         const inputIds = formChangeMulti.querySelector("input[name = ids]");
//         const typeChange = e.target.elements.type.value;
//         if (typeChange == "delete-all") {
//             const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này không?");
//             if(!isConfirm) {
//                 return;
//             }
//         }
//         if (inputsChecked.length > 0 ) {
//             let ids = [];
//             inputsChecked.forEach(input => {
//                 const id = input.value;
//                 if (typeChange == "change-position") {
//                     //lay ra position tu input cua inputschecked
//                     const position = input.closest("tr").querySelector("input[name = 'position']").value;
//                     ids.push(`${id}-${position}`)
//                 }
//                 else {
//                     ids.push(input.value);
//                 }
//             })
//             console.log(ids);
//             inputIds.value = ids.join(", ");
//             formChangeMulti.submit();   
//         }
//         else {
//             alert("Vui lòng chọn ít nhất 1 sản phẩm")
//         }
//     })
    
// }
//change status

// checkbox multi
//code tinh nang xoa san pham

// const buttonsDelete = document.querySelectorAll("[button-delete]");
// if (buttonsDelete.length > 0) {
//     buttonsDelete.forEach(button => {
//         //lay ra id cua button muon xoa
//         button.addEventListener('click', ()=> {
//             const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
//             if (isConfirm) {
//                 const formDeleteItem = document.querySelector("#form-delete-item")
//                 console.log(formDeleteItem)
//                 const id = button.getAttribute("data-id");
//                 const path = formDeleteItem.getAttribute("data-path");
//                 const action = `${path}/${id}?_method=DELETE`;
//                 formDeleteItem.action = action;
//                 formDeleteItem.submit();
//             }
//         })
//     })
// }

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