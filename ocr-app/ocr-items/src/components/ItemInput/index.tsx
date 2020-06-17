
import React from 'react';
import { IItem } from '../../store/form/constants';
import Dropdown from '../Dropdown';
import { dropdownTypesList, packageList } from '../Dropdown/Lists';
import { Input, Slider, TextField, Button, Avatar, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelActions, Divider, ListItemAvatar, ListItemText, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDatePicker, } from '@material-ui/pickers';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { editItemSuccess } from '../../store/form/actions';
import { setDateByDays, dayDifferance } from '../../store/form/utils';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const foodOptons = dropdownTypesList().concat(options);
const packagingOptons = packageList();


interface IProps {
  item: IItem;
  onChangeNameHandle?: (item: IItem) => any;
  onChangeTypeHandle?: (item: IItem) => any;
  onChangePackageHandle?: (item: IItem) => any;
  onChangeNumberHandle?: (item: IItem) => any;
  onDeleteHandle?: (item: IItem) => any;
}

export default React.memo<IProps>((props: IProps) => {
  const currDate: Date = props.item.date;
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

    const diffDays = dayDifferance(currDate, newDate);
    editItemSuccess("date", {
      ...props.item,
      date: setDateByDays(diffDays)
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
              <small>{props.item.number}</small>
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={`${props.item.name.toLocaleUpperCase()}`}
            secondary={`${date.substring(0, date.length - 12)} | ${props.item.type.toUpperCase()} `}
          />
          {props.onDeleteHandle && <Button size="small" onClick={props.onDeleteHandle(props.item)}>Delete</Button>}

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
            <Grid item={true} xs={2}>
              {props.onChangeNumberHandle &&
                <TextField
                  fullWidth
                  label="How many"
                  value={props.item.number}
                  type="text"
                  onChange={props.onChangeNumberHandle(props.item)}
                />}

            </Grid>
            <Grid item={true} xs={4}>
              {props.onChangePackageHandle && <Dropdown
                placeholder={"Packaging"}
                required={true}
                select={true}
                options={packagingOptons}
                name={"Name of DropDown"}
                onChange={props.onChangePackageHandle(props.item)}
                className={"dropdown"}
              />}

            </Grid>
            <Grid item={true} xs={4}>
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
