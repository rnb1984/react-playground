import React, { ChangeEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { history } from '../../store'
import { Tabs, Tab } from '@material-ui/core';
import { IStores, IStoredItem } from '../../store/stores/constants';
import { IAllItems, IItem } from '../../store/form/constants';
import { editStoreSuccess, editStoreItemsPending } from '../../store/stores/actions';
import { editItemsSuccess, editItemsPending } from '../../store/form/actions';
import { showSnackbar } from '../../store/snackbar/actions';


type Props = INavProps;

export interface INavProps {
    itemsListed: IAllItems;
    stores: IStores;
    pathname: string;
};

interface INavMenu { value: string, label: string };

const className = "navbar";

enum RoutesEnum {
    HOME = "/",
    STORE = "/store",
    BIN = "/bin"
}

const homeTabs: INavMenu[] = [{ value: RoutesEnum.HOME, label: "Home" },
                                { value: RoutesEnum.STORE, label: "Store" },
                                { value: RoutesEnum.BIN, label: "Bin" }]

class NavBar extends React.Component<Props>  {

    public render() {
        const { itemsListed, stores, pathname } = this.props
        return (
            <AppBar position="fixed" color="primary" className={`${className}_appBar`}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Tabs value={pathname} TabIndicatorProps={{ className: 'toolbar__indicator' }} onChange={switchPages}>
                        {homeTabs.map((tabNav: INavMenu) => (
                            <Tab value={tabNav.value} key={tabNav.value} label={tabNav.label} className="toolbar__tab" />
                        ))}
                    </Tabs>
                    <Fab color="secondary" aria-label="add" className={`${className}_fabButton`} onClick={storeListedItems(itemsListed, stores)} >
                        <AddIcon />
                    </Fab>
                    <div className={`${className}_grow`} />
                    <IconButton color="inherit" >
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>);
    };

};

export default NavBar;


function switchPages(event: ChangeEvent<{}>, value: string) {
    history.push(value);
}

const storeListedItems = (itemsListed: IAllItems, stores: IStores) => (event: any) => {
    const newStores = addListItemsToStoreList(stores.items, itemsListed.items);
    console.log("\n\n", newStores.length, "\n\n")
    editItemsPending();
    editStoreSuccess({ ...stores, items: newStores });
    editStoreItemsPending();
    editItemsSuccess({ items: [], changed: false });
    showSnackbar("Successfully Stored List");
    switchPages(event, RoutesEnum.STORE);
}

const addListItemsToStoreList = (stores: IStoredItem[], itemsListed: IItem[]) => {
    const newStoreItems: IStoredItem[] = [];
    // add to existing store item
    // add default storage
    if (stores.length > 0) {
        stores.forEach((stored, i) => {
            newStoreItems.push(stored);
            let removeItem = -1;
            itemsListed.forEach((item, j) => {
                console.log("\n\ncompare", item.name.toLowerCase(), stored.name.toLowerCase(), "\n\n");
                if (item.name.toLowerCase() === stored.name.toLowerCase()) {
                    newStoreItems[i] = { ...stored, number: stored.number + 1 };
                    removeItem = j;
                }
            });
            if (removeItem !== -1) {
                itemsListed.splice(removeItem, 1);
            }
        });
        itemsListed.forEach(item => {
            newStoreItems.push(
                { ...item, number: (item.number ? item.number : 1), stored: (item.stored ? item.stored : "fridge") }
            );
        });
    } else {
        itemsListed.forEach(item => {
            newStoreItems.push(
                { ...item, number: (item.number ? item.number : 1), stored: (item.stored ? item.stored : "fridge") }
            );
        });
    }
    return newStoreItems;
}





