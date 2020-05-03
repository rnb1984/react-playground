import React, { useState } from 'react';
import { setNewEditableITems } from '../../store/form/actions';
import { API_ENDPOINT, IItem } from "../../store/form/constants";
import { IFileForm } from "../../store/file/constants";
import ListItems from '../../components/ListItems';
import UploadImage from '../../components/UploadImage';
import { postImageFile } from '../../services/apiService';
import { Card, CardActions, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Calendar from '../../components/Calendar';
import Header from '../../components/Header';
import Empty from '../../components/Empty';

type Props = IStateProps;

export interface IStateProps {
  itemsView: IItem[];
  itemsEdit: IItem[];
  hasUpdated?: boolean;

  fileFormValues: IFileForm;
};


class FormPage extends React.Component<Props>  {

  public componentWillMount() {
    setNewEditableITems(this.props.itemsView);
    console.log("Mounting ", this.props.itemsView, this.props.itemsEdit);
  }

  public render() {
    const {
      itemsView,
      itemsEdit,
      hasUpdated,
      fileFormValues
    } = this.props;

    console.log("Form Page itemsEdit", itemsEdit)

    

    return (
      <div>
        <Header
          title={"List of Items"}
          subtitle={""}
          icon={<ShoppingCartIcon
            fontSize={"large"}
          />}
        />
        <Card>
          <CardHeader
            title={"All my items"}
            subheader={"Take or upload picture"}
            avatar={
              <ShoppingCartIcon />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>}
          />
          <CardActions>
            <UploadImage
              onSelectHandle={onUploadImageHandle}
            />
          </CardActions>
        </Card>
        {body(itemsView, itemsEdit)}
      </div>
    )
  }
};

const body = (itemsView: IItem[], itemsEdit: IItem[]) => {

  if (!itemsView || !itemsEdit) {
    return (<><h3>Item List</h3><Empty
      message="LOADING"
    /></>);
  }

  if (itemsView.length < 1 || itemsEdit.length < 1) {
    return (<><h3>No Item List</h3><Empty
      message="Nothing Listed"
    /></>);
  }

  return (
    <div>
      <ListItems
          title={"Item List"}
          items={itemsEdit}
        />
    </div>)
}


const onUploadImageHandle = (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {

  if (event.currentTarget.files && event.currentTarget.files.length !== 0) {
    postImageFile(API_ENDPOINT, event.currentTarget.files[0]);
  } else {
    console.log("NO FILES IN", event.currentTarget.files, event);
  }
}

export default FormPage;
