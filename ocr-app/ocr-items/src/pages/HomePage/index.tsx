import React from 'react';
import { setNewEditableStoreItems } from '../../store/stores/actions';
import Calendar from '../../components/Calendar';
import Header from '../../components/Header';
import HomeIcon from '@material-ui/icons/Home';
import { IStores } from '../../store/stores/constants';
import Empty from '../../components/Empty';
import { IBins, IBin } from '../../store/bin/constants';
import UpCommingList from '../../components/UpCommingList';


type Props = IHomeSateProps;

export interface IHomeSateProps {
  stores: IStores;
  bins: IBins;
};


class HomePage extends React.Component<Props>  {

  public componentWillMount() {
    setNewEditableStoreItems(this.props.stores.items);
  }

  public render() {
    const {
      stores,
      bins
    } = this.props;

    return (
      <div>
        <Header
          title={"Home"}
          subtitle={""}
          icon={<HomeIcon
            fontSize={"large"}
          />}
        />

        <h3>Items Comming Up</h3>
        {bodyStore(stores)}

        <h3>Items Removed</h3>
        {bodyBin(bins)}
      </div>
    )
  }
};


const bodyStore = (stores: IStores) => {

  if (!stores) {
    return (<Empty
      message="LOADING..."
    />);
  }

  if (stores.items.length < 1) {
    return (<Empty
      message="Store Empty"
    />);
  }

  return (
    <div>
      <UpCommingList
        stores={stores}
      />
      <h3>Items Calendar</h3>
      <Calendar
        stores={stores.items} />
    </div>)
}


const bodyBin = (bins: IBins) => {

  if (!bins) {
    return (<Empty
      message="LOADING..."
    />);
  }

  if (bins.items.length < 1) {
    return (<Empty
      message="Bin Empty"
    />);
  }

  return (
    <div>
      <ol>
        {bins.items.map((bin) => (
          <li>{bin.name}</li>
        ))}
      </ol>
    </div>)
}

export default HomePage;
