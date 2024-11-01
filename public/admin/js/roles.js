//begin permission js
const tablePermission = document.querySelector("[table-permission]")
console.log(tablePermission)
if (tablePermission) {
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener('click', () => {
        let permission = [];
        const rows = document.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input"); //tim tat ca cac the input co tren 1 hang
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permission.push({
                        id,
                        permission: []
                    })
                })
            }
            else {
                //neu data-name khong phai la id thi truyen data name vao mang permission neu no duoc check
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (input.checked) {
                        //push vao mang permission
                        permission[index].permission.push(name)
                    }
                })
            }
        })
        if (permission.length > 0) {
            const formChangePermission = document.querySelector("#form-change-permission")
            const inputPermission = document.querySelector("input[name = permission]");
            inputPermission.value = JSON.stringify(permission);
            formChangePermission.submit();
        }
    })
    //chuyen mang permission nay ve dang chuoi de dua vao form input
}
//end permission js

//permission data default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    records.forEach((record, index) => {
        const permissions = record.permission;
        permissions.forEach(permission => {
            const tablePermission = document.querySelector("[table-permission]")
            const row = tablePermission.querySelector(`tr[data-name = ${permission}]`);
            const input = row.querySelectorAll("input")[index]; //lay ra o input o record thu nhat
            input.checked = true;
        })
    })
}
//end permission data default
