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
        MuiButton: {
          text: {
            fontSize: '20px',
            fontWeight: 700,
          }
        },
        MuiMenuItem: {
          root: {
            fontSize: "22px",
            minHeight: "50px",
          }
        },
        MuiListItemText: {
          root: {
            minWidth: "120px",
          }
        },
        MuiDialogActions: {
          root: {
            margin: "14px",
          }
        }
      },
      typography: { 
        fontFamily: '"Montserrat", "Roboto", "Arial", sans',
        useNextVariants: true,
        headline: {
          fontWeight: 700,
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