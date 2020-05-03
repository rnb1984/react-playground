import { ItemsTypeEnum }  from "./constants" ;
import { IList, IAllItems, IItem } from "./constants";
import store from "..";


const constants = ItemsTypeEnum;

export const  addList =  (items: IList) => store.dispatch({
  type: constants.ADD_ITEMS,
  payload: items
});

export const setNewEditableITems =  (items: IItem []) => store.dispatch({
  type: constants.SET_UP_EDIT_ITEMS,
  payload: {items},
});


export const editItemsPending = () => store.dispatch({
  type: constants.EDIT_ITEMS_PENDING,
});

export const editItemsSuccess =  (items: IAllItems) => store.dispatch({
  type: constants.EDIT_ITEMS_SUCCESS,
  payload: items
});

export const editItemSuccess =  (property: string, item: IItem) => store.dispatch({
  type: constants.EDIT_ITEM_SUCCESS,
  payload: {property, item}
});

export const removeItems =  (item: IItem) => store.dispatch({
  type: constants.DELETE_ITEM,
  payload: item
});

export type IItemsAction =
{ type: ItemsTypeEnum.ADD_ITEMS, payload: IList } |
{ type: ItemsTypeEnum.SET_UP_EDIT_ITEMS, payload: IAllItems } |
{ type: ItemsTypeEnum.EDIT_ITEMS_PENDING, payload?: undefined } |
{ type: ItemsTypeEnum.EDIT_ITEMS_SUCCESS, payload: IAllItems } |
{ type: ItemsTypeEnum.EDIT_ITEM_SUCCESS, payload: IUpdateItem } |
{ type: ItemsTypeEnum.DELETE_ITEM, payload: IItem } 



interface IUpdateItem {
  property: string, item: IItem
}