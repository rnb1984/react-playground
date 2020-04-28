import { IItem, IAllItems } from "./constants";


// Create new list of Items from string of names 
export const creatNewItemsList = (listOfNames: string[]) => {
    const newItems: IItem[] = [];
    let index = listOfNames.length;

    listOfNames.forEach(element => {
        index = index + 1;
        newItems.push({
            index: "" + index,
            name: element,
            type: "unkown",
            date: "now",
            amount: 100
        })
    });
    return newItems;
}

export const findItemByName = (name: string, items: IItem[]): number | null => {
    if (items.length < 1)
        return null
    let found: number | null = null
    items.forEach((element, i) => {
        if (element.name === name)
            found = i;
    });
    return found;
}

export const findItemByIndex = (index: string, items: IItem[]): number | null => {
    if (items.length < 1)
        return null
    let found: number | null = null
    items.forEach((element, i) => {
        if (element.index === index)
            found = i;
    });
    return found;
}


export const updateItemName = (propertyChange: string, item: IItem, existingItems: IItem[]) => {

    let newItems: IItem[] = [];

    switch (propertyChange.toLowerCase()) {
        case "name":
        case "type":
        case "number":
        case "amount":
        case "date":
        default:
            newItems = changeItem(item, existingItems, newItems);
    }

    return { items: newItems };

}


export const removeItemByIndex = (index: string, existingItems: IItem[]) => {
    const newItems: IItem[] = [];
    console.log("Before", existingItems);

    existingItems.forEach(item => {

        if (item.index !== index)
            newItems.push({
                ...item,
            });
    });

    console.log("After", existingItems);

    return { items: newItems };

}


// Helpers for Updating Item
const changeItem = (newItem: IItem, existingItems: IItem[], newItems: IItem[]) => {
    existingItems.forEach(item => {
        console.log("indexs", item.index, newItem.index);
        if (item.index === newItem.index)
            newItems.push({
                ...newItem,
            });
        else
            newItems.push({
                ...item,
            });
    });
    return newItems;
}
