export enum SnackbarActionsEnum {
    SHOW_SNACKBAR = "snackbar/show-snackbar",
    HIDE_SNACKBAR = "snackbar/hide-snackbar"
}

export type ISnackbarActions =
    { type: SnackbarActionsEnum.SHOW_SNACKBAR, payload: { message: string, error?: boolean } } |
    { type: SnackbarActionsEnum.HIDE_SNACKBAR }


export interface ISnackbarState {
    open: boolean
    message: string
    error?: boolean
  }