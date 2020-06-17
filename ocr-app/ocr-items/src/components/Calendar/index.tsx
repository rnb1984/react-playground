import React from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem } from '@material-ui/core/';
import { IStoredItem } from '../../store/stores/constants';

interface IProps {
    title?: string;
    stores?: IStoredItem[];
}

export default React.memo<IProps>((props: IProps) => {
    const {
        title,
        stores
    } = props;
    
    // Split Stored Items in a Calander
    const storeCalendarMap: IStoreItemsByDate | null = stores ? splitByDate(stores) : null;
    const keys: string[] | null = storeCalendarMap ? Object.keys(storeCalendarMap) : null;

    if (storeCalendarMap && keys)
        return (<>
            {keys.map(key => (<>
                <Card key={key}>
                    <CardHeader
                        // title={monthNames.months[month].name}
                        title={key.substring(0, key.length - 12)}/>
                    <Divider />
                    <CardContent>
                        <List>
                            {storeCalendarMap[key].map(item => (
                                <ListItem key={item.index}>{item.name}</ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                <Divider />
            </>))}
        </>);
    else
        return (<div>no data</div>)
});

interface IStoreItemsByDate {
    [id: string]: IStoredItem[];
}

const splitByDate = (stores: IStoredItem[]) => {
    const storeByDate: IStoreItemsByDate = {}
    stores.forEach(item => {
        if (storeByDate[item.date.toUTCString()] && storeByDate[item.date.toUTCString()].length > 0)
            storeByDate[item.date.toUTCString()].push(item);
        else
            storeByDate[item.date.toUTCString()] = [item];
    });
    return storeByDate;
}