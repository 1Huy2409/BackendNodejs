// const { findOneAndReplace } = require("../../../models/product.model");
//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
//lay ra thuoc tinnh tu dinh nghia
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path)
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            //lay ra trang thai cua button day
            const currentStatus = button.getAttribute("data-status")
            const currentId = button.getAttribute("data-id")
            let statusChange = currentStatus == "active" ? "inactive" : "active";
            //gui data gom status va id cua button  

            //thay doi status cua tung button thong qua viec gui form
            let action = path + `/${statusChange}/${currentId}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit(); //submit form nay -> url se thay doi 
        })
    })
}
// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name = 'id']")
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            //check tat ca
            inputsId.forEach(input => {
                input.checked = true;
            })
        }
        else {
            //bo check tatca
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false
            }
        })
    })
}
//end checkbox multi    

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        //can dua id cua nhung item duoc checked len form name ids duoi dang mot text
        const inputsChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked")
        const inputIds = formChangeMulti.querySelector("input[name = ids]");
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này không?");
            if(!isConfirm) {
                return;
            }
        }
        if (inputsChecked.length > 0 ) {
            let ids = [];
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    //lay ra position tu input cua inputschecked
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    ids.push(`${id}-${position}`)
                }
                else {
                    ids.push(input.value);
                }
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();   
        }
        else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
        }
    })
    
}
//code tinh nang xoa san pham
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    buttonsDelete.forEach(button => {
        //lay ra id cua button muon xoa
        button.addEventListener('click', ()=> {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
            if (isConfirm) {
                const formDeleteItem = document.querySelector("#form-delete-item")
                console.log(formDeleteItem)
                const id = button.getAttribute("data-id");
                const path = formDeleteItem.getAttribute("data-path");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
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