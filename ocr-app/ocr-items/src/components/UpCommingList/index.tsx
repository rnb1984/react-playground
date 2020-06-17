import React from 'react';
import { List, ListItem, Paper, Divider } from '@material-ui/core';
import { IStores, IStoredItem } from '../../store/stores/constants';
import { setDateByDays } from '../../store/form/utils';


interface IProps {
    stores: IStores;
}

export default React.memo<IProps>((props: IProps) => {
    const {
        stores
    } = props
    const items: IStoredItem[] = filterByDate(stores.items, 3);

    if (items) {
        return (
            <div>
                <Paper>
                    <h3> {items.length} Up and Comming Items</h3>
                    <List >
                        {items.map(item => (
                            <>
                                <ListItem key={item.index} >{item.name}
                                </ ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>
                </Paper>
            </div>
        )
    } else {
        return (<div>Error: No Items</div>);
    }
});

const filterByDate = (items: IStoredItem[], maxDays: number) => {
    let itemsfiltered: IStoredItem[] = [];
    const maxDate: Date = setDateByDays(maxDays);
    if (items) {
        itemsfiltered = items.filter((item) => item.date <= maxDate);
        console.log("\n\nitemsfiltered: ", itemsfiltered, "\n\n")
    }
    return itemsfiltered
}

