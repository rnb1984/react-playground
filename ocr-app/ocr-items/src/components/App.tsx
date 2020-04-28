import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import FormPage from '../containers/FormContainer';

// import logo from './logo.svg';
import './App.css';

interface IProps {
  showContent?: boolean
}

export class App extends React.Component<IProps> {

  public componentDidMount() {
    const showContent = true;
    this.setState({ showContent })
  }

  public render() {
    return (
        <React.Fragment>
            <FormPage />
        </React.Fragment>
    );
  }
}
export default App;



