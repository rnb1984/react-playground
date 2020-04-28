import { FileFormypeEnum, IFileForm }  from "./constants" ;
import store from "../../store";

export const addFileForm = (items: IFileForm) => store.dispatch({
  type: FileFormypeEnum.FILE_FORM,
  payload: items
});

export type IFileFormAction = { type: FileFormypeEnum.FILE_FORM, payload: IFileForm } 





