import React from 'react';
import { IItem } from "../../store/form/constants";
import { editItemSuccess, removeItems } from '../../store/form/actions';
import ItemInput from '../ItemInput';


interface IProps {
    items?: IItem[]
}

export default React.memo<IProps>((props: IProps) => {
    const {
        items
    } = props

    if (items) {
        return (
            <div>
                <h3>List</h3>
                <ol>
                    {items.map(item => (
                        <li key={item.index}>
                            <ItemInput
                                item={item}
                                onChangeNameHandle={handleNameChange}
                                onChangeTypeHandle={handleTypeChange}
                                onChangeNumberHandle={handleNumberChange}
                                onDeleteHandle={onDeleteHandle}
                            />
                        </li>
                    ))}
                </ol>
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

    editItemSuccess("type", {
        ...item,
        type: event.target.value
    })
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