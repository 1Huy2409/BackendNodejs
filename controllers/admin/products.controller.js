// [GET] /admin/products
const Product = require("../../models/product.model")
const ProductsCategory = require("../../models/productsCategory.model")
const Accounts = require("../../models/account.model")
const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
const paginationHelper = require("../../helper/pagination")
const createTreeHelper = require("../../helper/createTree")
const systemConfig = require("../../config/system")
module.exports.index = async (req, res) => {
    //bo loc
    const filterStatus = filterStatusHelper(req.query)
    // object find 
    let find = {
        delete: false
    };
    if (req.query.status) {
        find.status = req.query.status
    }
    const objectSearch = searchHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    // pagination
    const countDocs = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req.query,
        //tao object pagination include limitItem and currentPage
        {
            currentPage: 1,
            limitItem: 4
        },
        countDocs
    )
    //end pagination
    const sortOptions = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;
        sortOptions[sortKey] = sortValue;
    }
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sortOptions);
    // console.log(products)
    //lay ra thong tin cua tung san pham 1
    for (const product of products) {
        const user = await Accounts.findOne({
            _id: product.createdBy.account_id
        })
        //lay ra thong tin nguoi tao
        if (user) {
            //add them 1 key vao product
            product.accountFullName = user.fullName
        }
        //lay ra thong tin nguoi cap nhat gan nhat  
        const updatedBy = product.updatedBy[product.updatedBy.length-1];
        if (updatedBy) {
            const userUpdate = await Accounts.findOne({
                _id: updatedBy.account_id
            })
            updatedBy.accountFullName = userUpdate.fullName;
            console.log(product);
        }
    }
    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
// /change-status/:status/:id', controller.changeStatus
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    await Product.updateOne({ _id: id }, { status: status,
        $push: {updatedBy: updatedBy}}
    );
    //them phan update cho cap nhat trang thai cua san pham

    req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
    res.redirect('back');
}
//changeMulti phương thức patch
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" , $push: {updatedBy: updatedBy}})
            req.flash('success', `Cập nhật trạng thái hoạt động thành công cho ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" , $push: {updatedBy: updatedBy}})
            req.flash('success', `Cập nhật trạng thái dừng hoạt động thành công cho ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                delete: true,
                deleteBy: {
                    account_id: res.locals.user.id,
                    deletedAt: new Date()
                }
            })
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm`)
            break;
        case "change-position":
            //thay doi position nho vao vong lap for
            for (let item of ids) {
                //su dung destructor
                let [id, position] = item.split("-");
                position = parseInt(position)
                await Product.updateOne({ _id: id }, { position: position , $push: {updatedBy: updatedBy}})
                req.flash('success', `Sắp xếp vị trí thành công cho ${ids.length} sản phẩm`)
            }
            break;
    }
    res.redirect('back')
}
//delete item phương thức delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id; //lay ra duoc id tren req tu form action
    //delete cac san pham co id do
    await Product.updateOne({ _id: id }, {
        delete: true,
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    });
    res.redirect('back');
}
//controller them moi san pham /admin/products/create
module.exports.create = async (req, res) => {
    console.log(res.locals.user)
    //dua ra danh muc san pham 
    const find = {
        delete: false
    }
    const category = await ProductsCategory.find(find);
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory
    })
}
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        //tang
        let countProducts = await Product.countDocuments();
        req.body.position = parseInt(countProducts + 1);
    }
    else {
        req.body.position = parseInt(req.body.position)
    }
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    const product = new Product(req.body) //truyen object req.body vao db
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
//render ra sản phẩm muốn edit
module.exports.editItem = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {
            delete: false,
            _id: id
        }
        const product = await Product.findOne(find)
        let data = {
            delete: false
        }
        const category = await ProductsCategory.find(data);
        const newCategory = createTreeHelper.tree(category);
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            category: newCategory
        })
    }
    catch (error) {
        req.flash("error", "Lỗi chỉnh sửa sản phẩm!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
module.exports.editPatch = async (req, res) => {
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.price = parseInt(req.body.price)
    req.body.position = parseInt(req.body.position)
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const id = req.params.id;
    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        }

        await Product.updateOne({ _id: id },
            {
                ...req.body,
                $push: { updatedBy: updatedBy }
            });
        req.flash('success', 'Chỉnh sửa sản phẩm thành công!')
    }
    catch (error) {
        req.flash('error', 'Chỉnh sửa sản phẩm thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    res.redirect('back')
}
//controller xem chi tiet cua san pham
module.exports.detail = async (req, res) => {
    //lay thong tin chi tiet thogn qua req.params.id;
    const id = req.params.id;
    try {
        const find = {
            delete: false,
            _id: id
        }
        const product = await Product.findOne(find);
        res.render(`admin/pages/products/detail`, {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {
        req.flash('error', 'Không thể xem chi tiết sản phẩm!')
    }
}