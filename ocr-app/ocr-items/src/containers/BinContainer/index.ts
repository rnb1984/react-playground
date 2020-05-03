import { connect } from 'react-redux';
import { IState } from '../../store';
import BinPage, {IBinProps} from '../../pages/BinPage';


const mapStateToProps = (state: IState): IBinProps => {
  return {
    bins: state.bin
  };
};

const mapDispatchToProps = (): {} => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BinPage); 