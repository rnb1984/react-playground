
export enum StoredItemsTypeEnum {
    ADD_ITEMS = 'stored/add-items-change',
    SET_UP_EDIT_ITEMS = 'stored/edit-set-up-items',
    EDIT_STORE_SUCCESS = 'stored/edit-store-success',
    EDIT_ITEMS_PENDING = 'stored/edit-items-pending',
    EDIT_ITEMS_SUCCESS = 'stored/edit-items-success',
    EDIT_ITEM_SUCCESS = 'stored/edit-item-success',
    FILE_FORM = 'stored/file-form',
    DELETE_ITEM = 'stored/delete-item',
  }

  export interface IStoredItem {
    index: string;
    name: string;
    type: string;
    date: Date;
    amount: number;
    number: number;
    stored: string;
    packaging?:string;
  }
  export interface IStores {
    items: IStoredItem [];
    stores: string [];
    changed?: boolean;
  }