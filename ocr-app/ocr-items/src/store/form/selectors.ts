import { IItemsState } from "./reducers";

export function getItemsView(state: IItemsState | undefined) {
  return state && state.view ? state.view.items : [] ;
}
  
export function getItemsEdit(state: IItemsState | undefined) {
  return state && state.edit ? state.edit.items :  [];
}
  
export function getHasItemsChanged(state: IItemsState | undefined ) {
  return state && state.edit ? state.edit.changed : false;
}