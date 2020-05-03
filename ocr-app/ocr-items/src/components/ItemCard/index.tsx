import React from 'react';
import { IItem } from '../../store/form/constants';
import Dropdown from '../Dropdown';
import { dropdownTypesList } from '../Dropdown/Lists';
import { TextField, Button, Card, CardContent, CardActions, CardHeader, IconButton, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const foodOptons = dropdownTypesList().concat(options);


interface IProps {
  item: IItem;
  onChangeNameHandle?: (item: IItem) => any;
  onChangeTypeHandle?: (item: IItem) => any;
  onChangeNumberHandle?: (item: IItem) => any;
  onDeleteHandle?: (item: IItem) => any;
}

export default React.memo<IProps>((props: IProps) => {
  const currDate: Date = new Date();
  currDate.setDate(currDate.getDate() + props.item.date);

  return (
    <Card>
      <CardHeader
      title={props.item.name}
      subheader={currDate.toUTCString()}
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      avatar={
        <Avatar aria-label="recipe" >
          R
        </Avatar>
      }
      />
      
      <CardContent>
      {props.onChangeNameHandle &&
          <TextField
            value={props.item.name}
            type="text"
            onChange={props.onChangeNameHandle(props.item)}
          />}
        <small>type: {props.item.type}  {props.item.number && "| number of item:" + props.item.number} amount: {props.item.amount} date: {currDate.toUTCString()} </small>
        <br />
        {props.onChangeNumberHandle && <input type="text" value={props.item.number} onChange={props.onChangeNumberHandle(props.item)} />}
        {props.onChangeTypeHandle && <Dropdown
          placeholder={"Type"}
          required={true}
          select={true}
          options={foodOptons}
          name={"Name of DropDown"}
          onChange={props.onChangeTypeHandle(props.item)}
          className={"dropdown"}
        />}
      </CardContent>
      <CardActions>
        {props.onDeleteHandle && <Button onClick={props.onDeleteHandle(props.item)}>Delete</Button>}
      </CardActions>

    </Card>)
});
