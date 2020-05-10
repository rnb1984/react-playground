
export enum BinTypeEnum {
    ADD_ITEM = 'bin/add-item',
    SET_UP_EDIT_ITEMS = 'bin/edit-set-up-items',
    EDIT_ITEMS_PENDING = 'bin/edit-items-pending',
    EDIT_ITEMS_SUCCESS = 'bin/edit-items-success',
    EDIT_ITEM_SUCCESS = 'bin/edit-item-success',
    FILE_FORM = 'bin/file-form',
    DELETE_ITEM = 'bin/delete-item',
  }

  export interface IBin {
    index: string;
    name: string;
    type: string;
    number?: number;
    bin?: string;
    packaging?:string;
  }
  export interface IBins {
    items: IBin [];
    bins: string [];
    changed?: boolean;
  }