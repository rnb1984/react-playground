import { connect } from 'react-redux';
import { IState } from '../../store';
import HomePage, { IHomeSateProps } from '../../pages/HomePage';


const mapStateToProps = (state: IState): IHomeSateProps => {
  return {
    stores: state.stores,
    bins: state.bin
  };
};

const mapDispatchToProps = (): {} => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage); 