import React, { CSSProperties } from 'react';
import { IItem } from "../../store/form/constants";
import { editItemSuccess, removeItems } from '../../store/form/actions';
import ItemInput from '../ItemInput';
import { timeTypeList } from '../Dropdown/Lists';
import { findTime } from '../../store/form/utils';
import { Card, ExpansionPanel, ExpansionPanelDetails, Typography, ExpansionPanelSummary, List, ListItem } from '@material-ui/core';


interface IProps {
    title?: string;
    items?: IItem[]
}

export default React.memo<IProps>((props: IProps) => {
    const {
        title,
        items
    } = props

    if (items) {
        return (
            <div>
                <h3>{title}</h3>
                <List >
                    {items.map(item => (
                                <ItemInput
                                key={item.index}
                                    item={item}
                                    onChangeNameHandle={handleNameChange}
                                    onChangeTypeHandle={handleTypeChange}
                                    onChangeNumberHandle={handleNumberChange}
                                    onDeleteHandle={onDeleteHandle}
                                />
                    ))}
                    </List> 
            </div>
        )
    } else {
        return (<div>Error: No Items</div>);
    }
});




const handleNameChange = (item: IItem) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    editItemSuccess("name", {
        ...item,
        name: event.target.value
    })
}

const handleTypeChange = (item: IItem) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const newType: string = event.target.value;

    const newTime = findTime(newType, 10000);

    if (newTime !== 10000)
        editItemSuccess("date", {
            ...item,
            type: newType,
            date: newTime
        });
    else
        editItemSuccess("type", {
            ...item,
            type: newType
        });
}

const handleNumberChange = (item: IItem) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let newNumber = 0;
    if (event.target.value !== "")
        newNumber = parseInt(event.target.value)

    editItemSuccess("number", {
        ...item,
        number: newNumber
    })

}

const onDeleteHandle = (item: IItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
    removeItems(item);
}