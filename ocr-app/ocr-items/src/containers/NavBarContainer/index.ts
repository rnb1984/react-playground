import { connect } from 'react-redux';
import { IState } from '../../store';
import NavBar, { INavProps } from '../../components/NavBar';


const mapStateToProps = (state: IState): INavProps => {
  return {
    itemsListed: state.items.edit,
    stores: state.stores,
    pathname: state.router && state.router.location.pathname || ''
  };
};

const mapDispatchToProps = (): {} => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar); 