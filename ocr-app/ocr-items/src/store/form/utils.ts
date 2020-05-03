import { IItem } from "./constants";
import { tagTypeList, timeTypeList } from '../../components/Dropdown/Lists';


/**
 * Create new list of Items from string of names 
 */
export const creatNewItemsList = (listOfNames: string[]) => {
    const newItems: IItem[] = [];
    let index = listOfNames.length;

    listOfNames.forEach(name => {
        index = index + 1;
        const foundType = findType(name);
        const nameIndex = findItemByName(name, newItems);

        if (nameIndex === null)
            newItems.push({
                index: index + "-" + name,
                name,
                type: foundType.toLowerCase(),
                date: findTime(foundType, 0),
                amount: 100,
                number: 1,
                stored: findStorage(foundType)
            });
        else
            newItems[nameIndex].number = newItems[nameIndex].number! + 1;
    });

    return newItems;
}

// Find Time
export const findTime = (newType: string, defaultTime: number) => {
    let timeFound = defaultTime;
    timeTypeList().forEach(timeType => {
        if (timeType.label.toLowerCase() === newType.toLowerCase())
            timeFound = timeType.value
    });
    return timeFound;
}

// Find Type
const findType = (name: string) => {
    let foundType: string = "unknown";
    const names: string[] = []
    name.split(" ").forEach(n => {
        names.push(n.toLowerCase())
    });
    tagTypeList().forEach(item => {
        item.tags.forEach(tag => {
            if (names.includes(tag))
                foundType = item.label;
        })
    }
    );
    console.log("\n\nNAMES", names, foundType, "\n\n")
    return foundType;
}

// Find Storage
const findStorage = (newType: string) => {
    if (newType.toLowerCase() === "unknown")
        return "cupboard";
    else
        return "fridge";
}

// find Items
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
