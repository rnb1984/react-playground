
import { SnackbarActionsEnum } from "./constants";
import store from "..";

export const showSnackbar = (message: string, error?: boolean) => store.dispatch({
        type: SnackbarActionsEnum.SHOW_SNACKBAR,
        payload: { message, error: error ? error : false}
    });

export const hideSnackbar = () => store.dispatch({
        type: SnackbarActionsEnum.HIDE_SNACKBAR
    });