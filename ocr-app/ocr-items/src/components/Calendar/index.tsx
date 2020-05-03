

import React from 'react';
import { IItem } from "../../store/form/constants";
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core/';
import monthNames from '../Dropdown/Lists/calendar.json';

interface IProps {
    title?: string;
    items?: IItem[]
}

export default React.memo<IProps>((props: IProps) => {
    const {
        title,
        items
    } = props;
    const today = new Date();
    const month = today.getMonth();


    return (<Card>
        <CardHeader
            title={monthNames.months[month].name}
        />
        <Divider />
        <CardContent></CardContent>
    </Card>);
});
