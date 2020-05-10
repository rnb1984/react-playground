import React from 'react';
import Header from '../../components/Header';
import Empty from '../../components/Empty';
import { IBins, IBin } from '../../store/bin/constants';
import { List, ListItemText, ListItem, Paper, Divider, Card, CardHeader, CardActions, IconButton, Grid, Button } from '@material-ui/core';
import { setNewEditableBin, editBinsPending, editBinsSuccess } from '../../store/bin/actions';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

type Props = IBinProps;

export interface IBinProps {
  bins: IBins;
};


class BinPage extends React.Component<Props>  {

  public componentWillMount() {
    setNewEditableBin(this.props.bins.items);
  }


  public render() {
    const {
      bins
    } = this.props;

    return (
      <div>
        <Header
          title={"Bin"}
          subtitle={""}
          icon={<DeleteIcon
            fontSize={"large"}
          />}
        />
        <Card>
          <CardHeader
            title={"Empty all items"}
            avatar={bins.items.length === 0 ? <DeleteOutlineIcon /> : <DeleteForeverIcon />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>}
          />
          <CardActions>
            <Grid
              container
              direction={"row"}
              spacing={2}>
              <Grid item xs={6}>
                <div>
                  <Button component="span"
                    onClick={emptyBin}>
                    Empty</Button>
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <h3>Bin Items</h3>
        {body(bins)}
      </div>
    )
  }
};


const body = (bins: IBins) => {

  if (!bins) {
    return (<Empty
      message="LOADING"
    />);
  }

  if (bins.items.length < 1) {
    return (<Empty
      message="Nothing in Bin"
    />);
  }

  return (
    <Paper>

      <List >
        {bins.items.map(item => (listItem(item)))}
      </List>
    </Paper>)
}

const listItem = (item: IBin) => {
  console.log("\n\npackaging", item.packaging, "\n\n\n" )
  return (
    <>
      <ListItem>
        <ListItemText
          key={`${item.index}`}
          primary={`${item.name.toLocaleUpperCase()}`}
          secondary={`${item.type.toUpperCase()} | ${item.packaging ? item.packaging.toUpperCase() : ""} `}
        />
      </ListItem>
      <Divider />
    </>)
}

const emptyBin = () => {
  editBinsPending();
  editBinsSuccess({
    items: [],
    bins: []
  });
}

export default BinPage;
