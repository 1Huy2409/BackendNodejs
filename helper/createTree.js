const createTree = (arr, parent_id = "") => {
    let count = 0;
    let tree = [];
        //duyet qua cac item co trong 
        arr.forEach((item) => {
            count++;
            if (item.parent_id == parent_id) {
                const newItem = item;
                newItem.index = count;
                const children = createTree(arr, newItem.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        })
    return tree;
}
module.exports.tree = (arr, parent_id = "") => {
    count = 0;
    const tree = createTree(arr, parent_id = "");
    return tree;
}