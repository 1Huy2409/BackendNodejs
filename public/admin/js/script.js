const buttonStatus = document.querySelectorAll("[button-status]")
console.log(buttonStatus);
if (buttonStatus.length > 0) {
    //khi so luong nut > 0 chay vao kiem tra tung button
    let url = new URL(window.location.href); //lay ra url cua page
    console.log(url)
    buttonStatus.forEach(function (button) {
        button.addEventListener('click', () => {
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
//code multi-change
//1. làm phần multi check-box
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

//end code multi-change
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
//begin sort
const sort = document.querySelector('[sort]');
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector('[sort-select]')
    const sortClear = sort.querySelector('[sort-clear]')
    //lay value tu sortSelect de dua len query
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const [sortKey, sortValue] = e.target.value.split("-");
            console.log(sortKey);
            console.log(sortValue);
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            window.location.href = url.href
        })
    }
    if (sortClear) {
        sortClear.addEventListener('click', () => {
            url.searchParams.delete('sortKey')
            url.searchParams.delete('sortValue')
            window.location.href = url.href
        })
    }
    //them thuộc tính selected = true cho option duoc chon
    const sortKey = url.searchParams.get('sortKey')
    const sortValue = url.searchParams.get('sortValue')
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const option = sort.querySelector(`option[value = ${stringSort}]`);
        option.selected = true;
    }

}
//end sort