import React, { Component } from 'react';
import { Provider } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import configureStore from "./configureStore.js";
import history from "./utils/history.js";
import "./Wedding.css";
import Cartographer from "./components/Cartographer/Cartographer.js";

class Wedding extends Component {

  render() {
    const state = {

    };
    return (
      <Provider store={configureStore(state, history)}>
        <div className="wedding"> 
          <MuiThemeProvider>
            <Cartographer />
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default Wedding;