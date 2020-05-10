import { combineReducers } from 'redux';
import { ItemsTypeEnum } from "./constants";
import { IActions } from '../index';
import { IAllItems } from "./constants";
import { removeItemByIndex, creatNewItemsList, updateItemName } from './utils';

const initialState: IAllItems = {
  items: [
    {
      index: "0",
      name: "intitial",
      type: "unknown",
      date: 0,
      amount: 100,
      number: 1
    }
  ]
};

export interface IItemsState {
  view: IAllItems,
  edit: IAllItems,
}


export const viewReducer = (state: IAllItems = initialState, action: IActions): IAllItems => {
  console.log("form/viewReducer");
  switch (action.type) {
    case ItemsTypeEnum.EDIT_ITEMS_SUCCESS:
      return {
        ...state,
        items:
          action.payload.items,
      };
    default:
      return state;
  }
}

export const editReducer = (state: IAllItems = initialState, action: IActions):
  IAllItems => {
    console.log("form/editReducer");
  switch (action.type) {
    case ItemsTypeEnum.ADD_ITEMS:
      return {
        ...state,
        changed: true,
        items: creatNewItemsList(action.payload.items),
      };
    case ItemsTypeEnum.SET_UP_EDIT_ITEMS:
      return {
        ...state,
        items: action.payload.items
      };
    case ItemsTypeEnum.EDIT_ITEMS_PENDING:
      return {
        ...state
      };
    case ItemsTypeEnum.EDIT_ITEM_SUCCESS:
      return {
        items: updateItemName(action.payload.property, action.payload.item, state.items).items
      };
    case ItemsTypeEnum.EDIT_ITEMS_SUCCESS:
      return {
        items: action.payload.items
      };

    case ItemsTypeEnum.DELETE_ITEM:
      const lessItems = removeItemByIndex(action.payload.index, state.items);
      return {
        items: lessItems.items
      };
    default:
      return state;
  }
}
const itemsReducer = combineReducers({
  view: viewReducer,
  edit: editReducer,
});

export default itemsReducer;