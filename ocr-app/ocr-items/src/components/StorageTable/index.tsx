import React from 'react';
import MaterialTable, { Column } from 'material-table';

import { IItem } from '../../store/form/constants';
import { typeIndexedDict, storageDict } from '../Dropdown/Lists';
import { Card } from '@material-ui/core';
import { tableIcons } from './constants';
import { IStoredItem } from '../../store/stores/constants';
import { editStoreItemsSuccess, editStoreItemsPending } from '../../store/stores/actions';
import { addBinSuccess } from '../../store/bin/actions';


interface IRow {
    index: string;
    name: string;
    type: string;
    date: number;
    storeLocation?: string;
    amount: number;
    total: number;
}

interface ITableState {
    columns: Column<IRow>[];
    data: IRow[];
}

interface IProps {
    title?: string;
    table: ITableState;
}

export default React.memo<IProps>((props: IProps) => {

    const [state, setState] = React.useState<ITableState>(props.table);
    console.log("\n\nData Storage Table: ", props.table.data);
    return (
        <Card>
            <MaterialTable
                icons={tableIcons}
                title={props.title}
                columns={state.columns}
                data={props.table.data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...props.table.data];
                                    data.push({...newData, index: data.length + "-" + newData.name });
                                    handleUpdateRow(data);
                                    return { ...props.table, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...props.table.data];
                                        let index = -1;
                                        data.forEach((d, i) => {
                                            if (d.index === oldData.index)
                                                index = i;
                                        });
                                        // data[data.indexOf(oldData)] = newData;
                                        data[index] = newData;
                                        handleUpdateRow(data);
                                        return { ...props.table, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {

                                    const data: IRow[] = [...prevState.data];
                                    let index = -1;
                                    // find old data index
                                    data.forEach((d, i) => {
                                        if (d.index === oldData.index){
                                            index = i;}
                                    });
                                    // add to bin and remove or lower number
                                    console.log("\n\n\n!!!!onRowDelete!!!\n\n\n");
                                    if (oldData.total > 1) {
                                        addBinSuccess({...oldData, number:1});
                                        data[index].total = oldData.total -1;
                                    } else{
                                        addBinSuccess({...oldData});
                                        data.splice(index, 1);
                                    }
                                    handleUpdateRow(data);
                                    return { ...props.table, data };
                                });
                            }, 600);
                        }),
                }}
            />
        </Card>
    );
});


const handleUpdateRow = (data: IRow[]) => {
    editStoreItemsPending();
    const items: IStoredItem[] = convertDataToItems(data);
    editStoreItemsSuccess(items);
}

const convertDataToItems = (data: IRow[]) => {
    const items: IStoredItem[] = []
    // set default if none exsits
    data.forEach((d, i) => {
        items.push({
            index: (d.index) ? d.index : ("" + i),
            name: (d.name && d.name !== "") ? d.name : "unknown",
            type: (d.type && d.type !== "") ? d.type : "unknown",
            date: d.date ? d.date : 0,
            amount: d.amount ? d.amount : 100,
            number: d.total ? d.total : 1,
            stored: d.storeLocation ? d.storeLocation : "fridge"
        });
    });
    return items;
}


export const createTableState = (items: IItem[] | IStoredItem[]): ITableState => {

    const dataIn: IRow[] = [];
    items.forEach(item => {
        dataIn.push({
            index: item.index,
            name: item.name,
            type: item.type,
            date: item.date,
            storeLocation: item.stored ? item.stored : "fridge",
            amount: item.amount,
            total: item.number ? item.number : 0

        })
    });
    return {

        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Days Left', field: 'date', type: 'numeric' },
            { title: 'Amount', field: 'amount', type: 'numeric' },
            { title: 'Type', field: 'type', lookup: typeIndexedDict() },
            { title: 'Stored Place', field: 'storeLocation',
                lookup: storageDict(),
            },
            { title: 'Total', field: 'total', type: 'numeric' },
        ],
        data: dataIn,
    }
}