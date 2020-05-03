import React from 'react';
import { setNewEditableStoreItems } from '../../store/stores/actions';
import Calendar from '../../components/Calendar';
import StorageTable, { createTableState } from '../../components/StorageTable';
import Header from '../../components/Header';
import KitchenIcon from '@material-ui/icons/Kitchen';
import { IStores } from '../../store/stores/constants';
import Empty from '../../components/Empty';

type Props = IStoreSateProps;

export interface IStoreSateProps {
  stores: IStores;
};


class StorePage extends React.Component<Props>  {

  public componentWillMount() {
    setNewEditableStoreItems(this.props.stores.items);
  }


  public render() {
    const {
      stores
    } = this.props;

    console.log("Form Page itemsEdit", stores.items)


    return (
      <div>
        <Header
          title={"Storage"}
          subtitle={""}
          icon={<KitchenIcon
            fontSize={"large"}
          />}
        />
        <Calendar />
        <h3>Storage</h3>
        {body(stores)}
      </div>
    )
  }
};


const body = (stores: IStores) => {

  if (!stores) {
    return (<Empty
      message="LOADING"
    />);
  }

  if (stores.items.length < 1) {
    return (<Empty
      message="Nothing Stored"
    />);
  }

  return (
    <div>
      <StorageTable
        title={"Stored Items"}
        table={createTableState(stores.items)}
      />
    </div>)
}

export default StorePage;
