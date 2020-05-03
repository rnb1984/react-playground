import { connect } from 'react-redux';
import { IState } from '../../store';
import { SnackBarMessage, ISnackbarMessageProps } from '../../components/SnackBarMessage';



const mapStateToProps = (state: IState): ISnackbarMessageProps => {
    return {
        snackbar:  state.snackbar
    };
  };
  
  const mapDispatchToProps = (): {} => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SnackBarMessage); 