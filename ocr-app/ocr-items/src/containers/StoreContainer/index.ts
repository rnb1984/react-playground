import { connect } from 'react-redux';
import { IState } from '../../store';
import StorePage, { IStoreSateProps } from '../../pages/StorePage';


const mapStateToProps = (state: IState): IStoreSateProps => {
  return {
    stores: state.stores
  };
};

const mapDispatchToProps = (): {} => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StorePage); 