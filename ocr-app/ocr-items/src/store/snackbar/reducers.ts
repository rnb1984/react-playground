import { ISnackbarState, SnackbarActionsEnum } from "./constants";
import { IActions } from "..";



// initial state
const initialState: ISnackbarState = {
    open: false,
    message: ""
}

/**
 * reducer
 */
export default function snackbarMessageReducer(state: ISnackbarState = initialState, action: IActions): ISnackbarState {
    switch (action.type) {
        case SnackbarActionsEnum.SHOW_SNACKBAR:
            return {
                ...state,
                open: true,
                message: action.payload.message,
                error: action.payload.error
            }
        case SnackbarActionsEnum.HIDE_SNACKBAR:
            return {
                ...state,
                open: false,
            }
        default:
            return state;
    }
}