import { ReducersMapObject, combineReducers } from "redux";
import { IState, IActions } from "../store";
import itemsReducer from "../store/form/reducers";
import fileFormReducer from "../store/file/reducers";


const reducers: ReducersMapObject<IState, IActions> = {
  items: itemsReducer,
  fileForm: fileFormReducer
}

export default combineReducers<IState, IActions>(reducers);