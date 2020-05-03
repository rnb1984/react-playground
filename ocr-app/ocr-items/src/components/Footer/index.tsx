import React from 'react';
import { Card, Grid } from '@material-ui/core';


interface IProps {
    message?: string
}

export default React.memo<IProps>((props: IProps) => {
    return (
        <div className={"footer"}>
            <Grid container={true}
                spacing={4}>
                <Grid item={true} xs={10}>
                    <small>{props.message}</small>
                </Grid>
            </Grid>
        </div>)
});