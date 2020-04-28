import React from 'react';
import { setNewEditableITems } from '../../store/form/actions';
import { API_ENDPOINT, IItem } from "../../store/form/constants";
import { IFileForm } from "../../store/file/constants";
import ListItems from '../../components/ListItems';
import UploadImage from '../../components/UploadImage';
import { postImageFile } from '../../services/apiService';
import TakePhoto from '../../components/TakePhoto';

type Props = IStateProps;

export interface IStateProps {
  itemsView: IItem [];
  itemsEdit: IItem [];
  hasUpdated?: boolean;
  fileFormValues: IFileForm;
  // saveChanges: any
};


class FormPage extends React.Component<Props>  {

  public componentWillMount() {
    setNewEditableITems(this.props.itemsView);
    console.log("Mounting ", this.props.itemsView, this.props.itemsEdit)
  }


  public render() {
    const {
      itemsView,
      itemsEdit,
      hasUpdated,
      fileFormValues
      // saveChanges,
    } = this.props;

    console.log("Form Page itemsEdit", itemsEdit)

    if (!itemsView || !itemsEdit) {
      return <span>LOADING</span>;
    }
    return (
      <div>
        <h1>All my items</h1>
        <ListItems
          items={itemsEdit}
        />
        <TakePhoto
          showCamera={false}
        />
        <UploadImage
          title="Items"
          updated={hasUpdated}
          onSelectHandle={onUploadImageHandle}
        />
      </div>
    )
  }
}


const onUploadImageHandle = (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {

  if (event.currentTarget.files && event.currentTarget.files.length !== 0) {
    postImageFile(API_ENDPOINT, event.currentTarget.files[0]);
  } else {
    console.log("NO FILES IN", event.currentTarget.files, event);
  }
}

export default FormPage;
