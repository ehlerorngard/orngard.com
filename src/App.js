import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Orngard from "./applications/Orngard/Orngard.js";
import Wedding from "./applications/Wedding/Wedding.js";
import PageNotFound from "./applications/PageNotFound/PageNotFound.js";
import "./root.css";


class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename="/">
          <Switch>
            <Route exact path="/" component={Orngard} />
            <Route path="/ehlerandemily" component={Wedding} />
            <Route path="/emilyandehler" component={Wedding} />
            <Route path="/wedding" component={Wedding} />
            <Route path="/e+e" component={Wedding} />
            <Route exact path="/index.html" render={() => (<Redirect to="/" />)} />
            <Route component={Orngard} /> 
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
