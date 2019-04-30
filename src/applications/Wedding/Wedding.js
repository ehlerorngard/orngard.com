import React, { Component } from 'react';
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightGreen, amber, cyan, indigo, purple, blueGrey } from '@material-ui/core/colors';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import configureStore from "./configureStore.js";
import history from "./utils/history.js";
import "./Wedding.css";
import Cartographer from "./components/Cartographer/Cartographer.js";

class Wedding extends Component {

  render() {
    const state = {};

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: lightGreen[400],
          main: lightGreen[500],
          dark: lightGreen[700],
          contrastText: cyan['A100'],
        },
        secondary: {
          light: purple[700],
          main: purple[800],
          dark: purple[900],
          contrastText: indigo['100'], 
        },
      },
      props: {
        MuiListItemBase: {
          fontSize: "2rem",
          fontFamily: "Oswald",
        },
        MuiListItemTextBase: {
            fontSize: "2rem",
            fontFamily: "Oswald",
        },
      },
      overrides: {
        MuiDrawer: {
          paper: {
            background: '#812859',
          }
        },
      },
      typography: { 
        useNextVariants: true,
        MuiListItem: {
          fontSize: "1.5rem",
          fontFamily: "Oswald",
        }
      },
      classes: {
        modalPaper: {
          padding: "24px",
        }
      }
    });

    return (
      <Provider store={configureStore(state, history)}>
        <div className="wedding"> 
          <MuiThemeProvider theme={theme}>
            <Cartographer />
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default Wedding;