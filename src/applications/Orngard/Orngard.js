import React, { Component } from 'react';
// import { Provider } from "redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import store from "./store"
import "./Orngard.css";

class Orngard extends Component {
  render() {
    return (
        <div className="Orngard">
          <h1 className="orngardHeader">
            Ørngård
          </h1>
          <h2 className="IPA">
            [ø:rn gå:r]
          </h2>
          <div className="orngardSubheader">
            >>> meaning "eagle farm", 
            is a Scandinavian surname, the bearers of which 
            came to be known by the name of the farm or 
            homestead they live on (or once lived on).
          </div>
          <div className="rerouteCard">
            <div className="rerouteText">
              * If you were looking for emily and ehler's wedding website, click here:
            </div>
            <Link to="/ehlerandemily" className="rerouteButton">
              wedding
            </Link>
          </div>
        </div>
    );
  }
}

export default Orngard;
