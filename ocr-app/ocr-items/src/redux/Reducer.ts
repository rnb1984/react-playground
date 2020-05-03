import { ReducersMapObject, combineReducers } from "redux";
import { IState, IActions } from "../store";
import itemsReducer from "../store/form/reducers";
import fileFormReducer from "../store/file/reducers";
import { editStoredReducer } from "../store/stores/reducers";
import { binReducer } from "../store/bin/reducers";
import snackbarMessageReducer from "../store/snackbar/reducers";


const reducers: ReducersMapObject<IState, IActions> = {
  items: itemsReducer,
  fileForm: fileFormReducer,
  stores: editStoredReducer,
  snackbar: snackbarMessageReducer,
  bin: binReducer
}

export default combineReducers<IState, IActions>(reducers);