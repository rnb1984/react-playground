import React from 'react';
import Calendar from '../../components/Calendar';
import Header from '../../components/Header';
import DeleteIcon from '@material-ui/icons/Delete';
import Empty from '../../components/Empty';
import { IBins, IBin } from '../../store/bin/constants';
import { List, ListItemText, ListItem, Paper, Divider } from '@material-ui/core';
import { setNewEditableBin } from '../../store/bin/actions';

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

    console.log("Form Page itemsEdit", bins.items)


    return (
      <div>
        <Header
          title={"Bin"}
          subtitle={""}
          icon={<DeleteIcon
            fontSize={"large"}
          />}
        />
        <Calendar />
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
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${item.name.toLocaleUpperCase()}`}
          secondary={`${item.type.toUpperCase()} `}
        />
      </ListItem>
      <Divider />
    </>)
}

export default BinPage;
