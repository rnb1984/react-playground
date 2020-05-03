import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from 'material-ui';
import React from 'react';
import { hideSnackbar } from '../../store/snackbar/actions';
import { ISnackbarState } from '../../store/snackbar/constants';

export interface ISnackbarMessageProps {
    snackbar: ISnackbarState
}

export class SnackBarMessage extends React.Component<ISnackbarMessageProps> {

    private handleClose() {
        hideSnackbar()
    }

    public render() {
        console.log("\n\nSnackbarMessage", this.props.snackbar, "\n\n\n\n");


        const { open, message, error } = this.props.snackbar;
        const cssClassPrefix = error ? "snackbar-error" : "snackbar"

        return (
            <Snackbar
                open={open}
                autoHideDuration={1000}
                message={<span>{message}</span>}
                onClose={this.handleClose}
                className={cssClassPrefix}
                anchorOrigin={{ horizontal: 'center', vertical: error ? 'bottom' : 'top' }}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        className={`${cssClassPrefix}__close`}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />)
    }


}