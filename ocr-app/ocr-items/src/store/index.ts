import { applyMiddleware, compose, createStore, Middleware, Action, CombinedState, combineReducers, ReducersMapObject } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { IItemsAction } from './form/actions';
import { IFileFormAction } from './file/actions';
import { IAllItems } from "./form/constants";
import { IFileForm } from "./file/constants";
import { RouteComponentProps } from 'react-router-dom';
import Reducer from '../redux/Reducer';


const initialState = {
  form: {},
  items: {},
  fileForm:{}
}

export const history: History = createBrowserHistory()
const enhancers: any[] = []
const middleware: Middleware[] = [routerMiddleware(history)]
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore<IState, IActions, {}, {}>(
  connectRouter(history)(Reducer),
  initialState,
  composedEnhancers
)


export type IActions = Action<undefined> |
IFileFormAction|
  IItemsAction 
  

export interface IState {
  fileForm: CombinedState<{
    form: IFileForm;
  }>;
  items: CombinedState<{
    view: IAllItems;
    edit: IAllItems;
  }>;
  router?: RouteComponentProps;
};