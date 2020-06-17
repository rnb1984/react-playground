import React from 'react';


import HomePage from '../containers/HomeContainer';
import FormPage from '../containers/FormContainer';
import StorePage from '../containers/StoreContainer';
import NavBar from '../containers/NavBarContainer';
import SnackBarMessage from '../containers/SnackbarContainer';
import BinPage from '../containers/BinContainer';

// import logo from './logo.svg';
import './App.scss';
import { MuiThemeProvider } from 'material-ui/styles';
import { create } from 'jss';
import { CssBaseline } from '@material-ui/core';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router';
import Footer from './Footer';
import { RoutesEnum } from './NavBar';



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
            <SnackBarMessage />
            <Container maxWidth="md">
              <Route exact path={RoutesEnum.HOME} component={HomePage} />
              <Route exact path={RoutesEnum.ITEM} component={FormPage} />
              <Route exact path={RoutesEnum.STORE} component={StorePage} />
              <Route exact path={RoutesEnum.BIN} component={BinPage} />
              <Footer/>
              <NavBar />
            </Container>
          </React.Fragment>
        </MuiThemeProvider>
      </StylesProvider>
    );
  }
}
export default App;



