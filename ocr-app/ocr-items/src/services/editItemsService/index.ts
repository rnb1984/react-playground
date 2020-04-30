import { IList } from "../../store/form/constants";
import { editItemsPending, editItemsSuccess } from "../../store/form/actions";
import { creatNewItemsList } from "../../store/form/utils";


export const storeItemsFromList = (listOfNames: IList) => {
    editItemsPending();
    editItemsSuccess({
        items: creatNewItemsList(listOfNames.items)
    });
};

