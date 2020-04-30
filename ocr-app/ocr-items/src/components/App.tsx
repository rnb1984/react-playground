import React from 'react';


import FormPage from '../containers/FormContainer';

// import logo from './logo.svg';
import './App.scss';
import { MuiThemeProvider } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { CssBaseline } from '@material-ui/core';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from './NavBar';

interface IProps {
  showContent?: boolean
}

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

export class App extends React.Component<IProps> {

  public componentDidMount() {
    const showContent = true;
    this.setState({ showContent })
  }

  public render() {
    return (
      <StylesProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider>
        <CssBaseline />
        <React.Fragment>
          <Container maxWidth="sm">
            <FormPage />
            <NavBar title={"Main Nav"}/>
          </Container>
        </React.Fragment>
      </MuiThemeProvider>
      </StylesProvider>
    );
  }
}
export default App;



