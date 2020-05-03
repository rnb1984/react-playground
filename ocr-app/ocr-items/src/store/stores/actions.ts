import { StoredItemsTypeEnum }  from "./constants" ;
import { IStoredItem, IStores } from "./constants";
import store from "..";


const constants = StoredItemsTypeEnum;


export const setNewEditableStoreItems =  (items: IStoredItem []) => store.dispatch({
  type: constants.SET_UP_EDIT_ITEMS,
  payload: items,
});


export const editStoreItemsPending = () => store.dispatch({
  type: constants.EDIT_ITEMS_PENDING,
});

export const editStoreSuccess =  (stores: IStores ) => store.dispatch({
  type: constants.EDIT_STORE_SUCCESS,
  payload: stores
});

export const editStoreItemsSuccess =  (items: IStoredItem [] ) => store.dispatch({
  type: constants.EDIT_ITEMS_SUCCESS,
  payload: items
});

export const editStoreItemSuccess =  (property: string, item: IStoredItem) => store.dispatch({
  type: constants.EDIT_ITEM_SUCCESS,
  payload: {property, item}
});

export const removeStoreItems =  (item: IStoredItem) => store.dispatch({
  type: constants.DELETE_ITEM,
  payload: item
});

export type IStoredAction =
{ type: StoredItemsTypeEnum.SET_UP_EDIT_ITEMS, payload: IStoredItem [] } |
{ type: StoredItemsTypeEnum.EDIT_ITEMS_PENDING, payload?: undefined } |
{ type: StoredItemsTypeEnum.EDIT_STORE_SUCCESS, payload: IStores } |
{ type: StoredItemsTypeEnum.EDIT_ITEMS_SUCCESS, payload: IStoredItem [] } |
{ type: StoredItemsTypeEnum.EDIT_ITEM_SUCCESS, payload: IUpdateItem } |
{ type: StoredItemsTypeEnum.DELETE_ITEM, payload: IStoredItem } 



interface IUpdateItem {
  property: string, item: IStoredItem
}