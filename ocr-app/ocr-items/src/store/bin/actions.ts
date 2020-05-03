import { BinTypeEnum } from "./constants";
import { IBins, IBin } from "./constants";
import store from "..";


const constants = BinTypeEnum;

export const addBinSuccess = (item: IBin) => {
  console.log("\n\n\n!!DELETE!!", item, "\n\n\n");
  store.dispatch({
    type: constants.ADD_ITEM,
    payload: item
  });
}

export const setNewEditableBin = (items: IBin[]) => store.dispatch({
  type: constants.SET_UP_EDIT_ITEMS,
  payload: items,
});


export const editBinsPending = () => store.dispatch({
  type: constants.EDIT_ITEMS_PENDING,
});

export const editBinsSuccess = (items: IBins) => store.dispatch({
  type: constants.EDIT_ITEMS_SUCCESS,
  payload: items
});

export const removeBinItem = (item: IBin) => store.dispatch({
  type: constants.DELETE_ITEM,
  payload: item
});

export type IBinAction =
  { type: BinTypeEnum.SET_UP_EDIT_ITEMS, payload: IBin[] } |
  { type: BinTypeEnum.ADD_ITEM, payload: IBin } |
  { type: BinTypeEnum.EDIT_ITEMS_PENDING, payload?: undefined } |
  { type: BinTypeEnum.EDIT_ITEMS_SUCCESS, payload: IBins } |
  { type: BinTypeEnum.DELETE_ITEM, payload: IBin } 
