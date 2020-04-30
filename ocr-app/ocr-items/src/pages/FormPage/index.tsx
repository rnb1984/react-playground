import React from 'react';
import { setNewEditableITems } from '../../store/form/actions';
import { API_ENDPOINT, IItem } from "../../store/form/constants";
import { IFileForm } from "../../store/file/constants";
import ListItems from '../../components/ListItems';
import UploadImage from '../../components/UploadImage';
import { postImageFile } from '../../services/apiService';
import TakePhoto from '../../components/TakePhoto';
import { Card, CardContent, CardActions, CardHeader, IconButton, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

    if (!itemsView || !itemsEdit) {
      return <span>LOADING</span>;
    }
    return (
      <div>
        <Card>
          <CardHeader
            title={"All my items"}
            subheader={"Take or upload picture"}
            avatar={
              <ShoppingCartIcon/>
                }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>}
          />
          <CardContent>
          <TakePhoto
              showCamera={false}
            />
          </CardContent>
          <CardActions>
            <UploadImage
              onSelectHandle={onUploadImageHandle}
            /> 
          </CardActions>

        </Card>
        <ListItems
          title={"Item List"}
          items={itemsEdit}
        />
      </div>
    )
  }
};


const onUploadImageHandle = (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {

  if (event.currentTarget.files && event.currentTarget.files.length !== 0) {
    postImageFile(API_ENDPOINT, event.currentTarget.files[0]);
  } else {
    console.log("NO FILES IN", event.currentTarget.files, event);
  }
}

export default FormPage;
