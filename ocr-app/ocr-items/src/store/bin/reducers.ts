
import { BinTypeEnum } from "./constants";
import { IActions } from '../index';
import { IBins, IBin } from "./constants";

const initialState: IBins = {
  bins: ["kitchen"],
  items: []
};


export const binReducer = (state: IBins = initialState, action: IActions):
  IBins => {
  console.log("bin/binReducer", state, "\naction: ", action, "\n\n");
  switch (action.type) {
    case BinTypeEnum.SET_UP_EDIT_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case BinTypeEnum.EDIT_ITEMS_PENDING:
      return {
        ...state
      };
    case BinTypeEnum.ADD_ITEM:
      const newBinItems: IBin[] = [];
      const newBinItem: IBin = action.payload;
      // Make sure index is not allready stoered
      state.items.forEach(item => newBinItems.push(item));
      if (!includesItemByIndex(newBinItem, newBinItems))
        newBinItems.push(action.payload);
      return {
        ...state,
        items: newBinItems
      };
    case BinTypeEnum.EDIT_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items
      };

    case BinTypeEnum.DELETE_ITEM:
      state.items.splice(state.items.indexOf(action.payload), 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}

const includesItemByIndex = (itemIn: IBin, items: IBin[]) => {
  let isIncluded: boolean = false;
  items.forEach(item => {
    if (item.index === itemIn.index)
      isIncluded = true;
  });
  return isIncluded;

}
