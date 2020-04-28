import React from 'react';
import { IItem } from '../../store/form/constants';

const ItemInput = (props: {
  item: IItem;
  onChangeNameHandle: (item: IItem) => any;
  onChangeTypeHandle: (item: IItem) => any;
  onChangeNumberHandle: (item: IItem) => any;
  onDeleteHandle: (item: IItem) => any;
}) => (
  <div>
    <br />
    {props.item.name} <button onClick={props.onDeleteHandle(props.item)}>Delete</button>
    <br />
    <input type="text" value={props.item.name} onChange={props.onChangeNameHandle(props.item)} /> 
    <br />
<small>type: {props.item.type}  {props.item.number && "| number of item:" + props.item.number} amount: {props.item.amount}</small>
    <br />
    <input type="text" value={props.item.type} onChange={props.onChangeTypeHandle(props.item)} />
    <input type="text" value={props.item.number} onChange={props.onChangeNumberHandle(props.item)} />
  </div>
);

export default ItemInput;

