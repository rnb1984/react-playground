
import { StoredItemsTypeEnum } from "./constants";
import { IActions } from '../index';
import { IStores } from "./constants";

const initialState: IStores = {
  stores: ["fridge"],
  items: [
    {
      index: "0",
      name: "intitial",
      type: "unknown",
      date: 0,
      amount: 100,
      number: 1,
      stored: "fridge"
    }
  ]
};


export const editStoredReducer = (state: IStores = initialState, action: IActions):
  IStores => {
    console.log("stores/editStoredReducer");
  switch (action.type) {
    case StoredItemsTypeEnum.SET_UP_EDIT_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case StoredItemsTypeEnum.EDIT_ITEMS_PENDING:
      return {
        ...state
      };
    case StoredItemsTypeEnum.EDIT_ITEM_SUCCESS:
      return {
        ...state
      };
    case StoredItemsTypeEnum.EDIT_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case StoredItemsTypeEnum.EDIT_STORE_SUCCESS:
      return {
        ...action.payload
      };

    case StoredItemsTypeEnum.DELETE_ITEM:
      state.items.splice(state.items.indexOf(action.payload), 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}