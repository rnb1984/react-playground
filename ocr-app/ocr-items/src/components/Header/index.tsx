
import React from 'react';
import { Card, Grid } from '@material-ui/core';


interface IProps {
    title: string,
    subtitle: string
    icon: any
}

export default React.memo<IProps>((props: IProps) => {
    return (
        <Card>
            <Grid container={true}
                spacing={4}>
                <Grid item={true} xs={2}>
                    <div className="header_image" >{props.icon}</div>
                </Grid>
                <Grid item={true} xs={10}>
                    <h1 className="header">{props.title}</h1>
                    <h3 className="header">{props.subtitle}</h3>
                </Grid>
            </Grid>
        </Card>)
});
