import React from 'react';
import { Card, Grid } from '@material-ui/core';


interface IProps {
    message: string
}

export default React.memo<IProps>((props: IProps)=> {
  return ( <Card><Grid container spacing={10}><Grid item xs={12}  ><h3>{props.message}</h3></Grid></Grid></Card>);
});
