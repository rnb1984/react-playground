import { connect } from 'react-redux';
import FormPage, { IStateProps } from '../../pages/FormPage';
import { IState } from '../../store';
import { getItemsView, getItemsEdit, getHasItemsChanged } from '../../store/form/selectors';


const mapStateToProps = (state: IState): IStateProps => {
  return {
    itemsView: getItemsView(state.items),
    itemsEdit: getItemsEdit(state.items),
    hasUpdated: getHasItemsChanged(state.items),
    fileFormValues: state.fileForm.form
  };
};

const mapDispatchToProps = (): {} => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage); 