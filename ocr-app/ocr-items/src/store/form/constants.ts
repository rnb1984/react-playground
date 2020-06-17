
export const API_ENDPOINT = 'http://127.0.0.1:5000/upload-image';


export enum ItemsTypeEnum {
    ADD_ITEMS = 'items/add-items-change',
    SET_UP_EDIT_ITEMS = 'items/edit-set-up-items',
    EDIT_ITEMS_PENDING = 'items/edit-items-pending',
    EDIT_ITEMS_SUCCESS = 'items/edit-items-success',
    EDIT_ITEM_SUCCESS = 'items/edit-item-success',
    FILE_FORM = 'items/file-form',
    DELETE_ITEM = 'items/delete-item',
  }
  
  export interface IList {
    items: string[];
  }
  export interface IItem {
    index: string;
    name: string;
    type: string;
    date: Date;
    amount: number;
    number?: number;
    stored?: string;
    packaging?:string;
  }
  export interface IAllItems {
    items: IItem[];
    changed?: boolean;
  }