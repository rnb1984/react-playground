import { IList, IItem } from "../../store/form/constants";
import { editItemsPending, editItemsSuccess } from "../../store/form/actions";
import { findItemByName } from "../../store/form/utils";


export const storeItemsFromList = (listOfNames: IList) => {
    editItemsPending();
    const newItems: IItem[] = [];
    let index = 0;
    console.log("Reponse items", listOfNames.items);
    listOfNames.items.forEach(name => {
        index = index + 1;
        const nameIndex = findItemByName(name, newItems);
        if (nameIndex === null)
            newItems.push({
                index: "" + index,
                name,
                type: "unkown",
                date: "now",
                amount: 100,
                number: 1
            });
        else
            newItems[nameIndex].number = newItems[nameIndex].number! + 1;
    });
    editItemsSuccess({ items: newItems });
};

