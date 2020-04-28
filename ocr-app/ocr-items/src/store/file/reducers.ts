import { combineReducers } from 'redux';
import { FileFormypeEnum, IFileForm } from "./constants";
import { IActions } from '../index';

const initialState: IFileForm = {
};

export const fileReducer = (state: IFileForm = initialState, action: IActions): IFileForm => {
  console.log("fileReducer");
  switch (action.type) {
    case FileFormypeEnum.FILE_FORM:
      console.log("FileFormypeEnum.FILE_FORM");
      return {
        ...state,
        form : 
          action.payload.form,
      };
    default:
      return state;
  }
}

export const fileFormReducer = combineReducers({
  form: fileReducer
});

export default fileFormReducer;