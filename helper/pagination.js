module.exports = (query, objectPagination,countDocs) => {
    if (query.page) {
        //ton tai key page trong url 
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    objectPagination.totalPage = Math.ceil(countDocs/objectPagination.limitItem);
    //tinh toan phan so luong trang dua vao so luong san pham trong db
    return objectPagination;
}