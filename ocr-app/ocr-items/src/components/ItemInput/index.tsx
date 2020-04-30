
import React from 'react';
import { IItem } from '../../store/form/constants';
import Dropdown from '../Dropdown';
import { dropdownTypesList } from '../Dropdown/Lists';
import { Input, Slider, TextField, Button, Avatar, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelActions, Divider, ListItemAvatar, ListItemText, Grid, Paper, Typography } from '@material-ui/core';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDatePicker, } from '@material-ui/pickers';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { editItemSuccess } from '../../store/form/actions';


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
  const date = currDate.toUTCString();

  // Handle expansion open close
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle Date picker
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(currDate),
  );
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);

    const diffTime = Math.abs(currDate.getTime() - (newDate ? newDate.getTime() : 0));
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    console.log("\n\nDiff date", diffTime, diffDays, "\n\n");
    editItemSuccess("date", {
      ...props.item,
      date: diffDays
    });
  };


  // Handle amount
  const [value, setValue] = React.useState<number>(props.item.amount);


  const handleInputChange = (event?: React.ChangeEvent<HTMLInputElement> | any, newValue?: number | number[]) => {
    let newAmount: number = 0;
    if (event && event.target && event.target.value) {
      newAmount = parseFloat(event.target.value);
    } else {
      newAmount = Number(newValue);
    }
    setValue(newAmount);
    editItemSuccess("amount", {
      ...props.item,
      amount: newAmount
    });
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div>


      <ExpansionPanel
        key={props.item.index}
        expanded={expanded === `panel-${props.item.index}`}
        onChange={handleChange(`panel-${props.item.index}`)}>

        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.item.index}-content`}
        >
          <ListItemAvatar>
            <Avatar>
              <KitchenIcon fontSize="inherit" />
              <small>{props.item.number}</small>
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={`${props.item.name.toLocaleUpperCase()}`}
            secondary={`${date.substring(0, date.length - 12)} | ${props.item.type.toUpperCase()} `}
          />

        </ExpansionPanelSummary>

        <ExpansionPanelDetails>

          <Grid container={true}
            spacing={4}>
            <Grid item={true} xs={12}>
              {props.onChangeNameHandle &&
                <TextField
                  fullWidth
                  label="Item"
                  value={props.item.name}
                  type="text"
                  onChange={props.onChangeNameHandle(props.item)}
                />}
            </Grid>
            <Grid item={true} xs={4}>
              {props.onChangeNumberHandle &&
                <TextField
                  fullWidth
                  label="How many"
                  value={props.item.number}
                  type="text"
                  onChange={props.onChangeNumberHandle(props.item)}
                />}

            </Grid>
            <Grid item={true} xs={8}>
              {props.onChangeTypeHandle && <Dropdown
                placeholder={"Type"}
                required={true}
                select={true}
                options={foodOptons}
                name={"Name of DropDown"}
                onChange={props.onChangeTypeHandle(props.item)}
                className={"dropdown"}
              />}

            </Grid>
            
            <Grid item={true} xs={6}>
              <FastfoodIcon />
              <Input
                value={value}
                placeholder="Amount"
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />%
              </Grid>
              <Grid item={true} xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Run out"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item={true} xs={12}>
              <Slider
                value={typeof value === 'number' ? value : 0}
                onChange={handleInputChange}
                aria-labelledby="input-slider"
              />
              </Grid>
            </Grid>
        </ExpansionPanelDetails>

        {/* Action Buttons */}
        <Divider />
        <ExpansionPanelActions>
          {props.onDeleteHandle && <Button size="small" onClick={props.onDeleteHandle(props.item)}>Delete</Button>}
        </ExpansionPanelActions>

      </ExpansionPanel>
    </div>)
});
