import React, {
    Component
} from 'react';
import * as uuid from 'uuid/v4';
export let addItem = (dataObj, contentIndex, config, SuccessCallBack) => {
    let {
        name,
        description,
    } = dataObj;
    var data = Object.assign({}, config);
    data.categories[contentIndex].items.push({
        name,
        description,
        id: uuid()
    });

    SuccessCallBack(data)


}
export let editItem = (dataObj, catId, config, SuccessCallBack) => {

    let {
        itemPrice,
        itemDescription,
        itemName,
        itemId
    } = dataObj;
    var data = Object.assign({}, config);
    var index = data.categories.findIndex(x => x.id === catId);
    var itemIndex = data.categories[index].items.findIndex(x => x.id === itemId);
    data.categories[index].items[itemIndex] = {
        ...data.categories[index].items[itemIndex],
        description: itemDescription,
        name: itemName,
        price: itemPrice,
    };
    SuccessCallBack(data)
}
export let deleteCategory = (index, config, SuccessCallBack) => {
    var data = Object.assign({}, config);
    data.categories.splice(index, 1);
    SuccessCallBack(data)
}
export let deleteItem = (itemId, catId, config, SuccessCallBack) => {

    var data = Object.assign({}, config);
    var index = data.categories.findIndex(x => x.id === catId);
    let items = data.categories[index].items.filter(x => x.id !== itemId);
    data.categories[index].items = items;
    SuccessCallBack(data)

}
export const addCategory = (category, config, SuccessCallBack) => {

    var data = Object.assign({}, config);
    var categories = data.categories;
    categories.push({
        name: category.name,
        items: [],
        description: category.description,
        id: uuid(),
    });
    SuccessCallBack(data)

}
export const editCategory = (dataObj, config, SuccessCallBack) => {

    let {
        name,
        description,
        category
    } = dataObj;
    var data = Object.assign({}, config);
    var index = data.categories.findIndex(x => x.id === category.id);
    data.categories[index] = {
        ...data.categories[index],
        name,
        description,
    };
    SuccessCallBack(data)

}