import React, { Component } from 'react';
// import { Provider } from "redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import store from "./store"
import "./Orngard.css";

class Orngard extends Component {
  state = {
    screenSize: "mobile",
  }

  componentDidMount() {
    this.getScreenSize();
    setTimeout(function() {window.scroll(0, 0)}, 2000);
    window.addEventListener("resize", this.getScreenSize, true);
    // setTimeout(this.getScreenSize, 400);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getScreenSize, true);
  }

  getScreenSize = () => {
    let screenSize = "";
    if (window.innerWidth < 600) screenSize = "mobile";
    else if (window.innerWidth <= 1024) screenSize = "tablet";
    else screenSize = "computer";

    this.setState({ screenSize: screenSize, innerHeight: window.innerHeight });
  }



  render() {
    const orngard = () => {
      if (this.state.screenSize === "mobile") return {
        padding: "20px",
        position: "relative",
      }
      else return {
        padding: "44px",
        position: "relative",
      }
    }

    const leftColumnWrapper = () => {
      if (this.state.screenSize !== "mobile") return {
        maxWidth: "50vw",
        display: "inline-block",
      }
      else return {
        width: "100%",
        margin: "0px",
        padding: "0px",
      }
    }

    const orngardHeader = () => {
      if (this.state.screenSize === "mobile") return {
        fontSize: "48px",
        display: "inline-block",
        margin: "0px 0px 12px",
      }
      else return {
        fontSize: "84px",
        display: "inline-block",
        margin: "0px 0px 12px",
      }
    }

    const ipa = () => {
      if (this.state.screenSize === "mobile") return {
        fontSize: "22px",
        margin: "10px 40px 24px",
      }
      else return {
        fontSize: "32px",
        marginLeft: "50px",
      }
    }

    const orngardSubheader = () => {
      if (this.state.screenSize === "mobile" && this.state.innerHeight < 632) return {
        fontFamily: 'Roboto',
        fontSize: "16px",
        maxWidth: "100%",
      }    
      else if (this.state.screenSize === "mobile") return {
        fontFamily: 'Sacramento',
        fontSize: "28px",
        maxWidth: "100%",
      }
      else return {
        fontFamily: 'Sacramento',
        fontSize: "42px",
        maxWidth: "100%",
        margin: "12px 0 0 0",
      }
    }

    const rerouteCard = () => {
      let innerWmobile = window.innerWidth - 40;  // minus all padding + margins
      let innerWwide = window.innerWidth - 128;
      if (this.state.screenSize === "mobile") return {
        padding: "16px",
        margin: "36px 0px 0px",
        maxWidth: innerWmobile,
        minHeight: "auto",
      }
      else return {
        padding: "22px",
        margin: "50px 14px",
        maxWidth: "33vw",
        display: "inline-flex",
        position: "absolute", 
        top: "14vh",
        right: "12px",
      }
    }

    const rerouteText = () => {
      if (this.state.screenSize === "mobile") return {
        fontSize: "24px",
        display: "block",
      }
      else return {
        fontSize: "30px",
        display: "inline-table",
        textAlign: "center",
      }
    }

    const rerouteButton = () => {
      if (this.state.screenSize === "mobile") return {
        bottom: "0",  
        margin: "12px",
        padding: "12px",
        fontSize: "32px",
        display: "block",
      }
      else return {
        bottom: "0",  
        margin: "10px",
        padding: "14px",
        fontSize: "48px",
        display: "inline-table",
      }
    }


    return (
        <div className="Orngard" style={orngard()}>

          <div className='orngardLeftColumnWrapper' style={leftColumnWrapper()}>

            <h1 className="orngardHeader" style={orngardHeader()}>
              Ørngård
            </h1>
            <a className="IPA" style={ipa()} target="_blank" rel="noopener noreferrer" href='https://en.wikipedia.org/wiki/Help:IPA/English'>
              [ø:rn gå:r]
            </a>
            <div className="orngardSubheader" style={orngardSubheader()}>
              >>> meaning "eagle farm", 
              is a Scandinavian surname, the bearers of which 
              came to be known by the name of the farm or 
              homestead they live on or once lived on.
            </div>

          </div>

          <div className="rerouteCard" style={rerouteCard()}>
            <div className="asterisk">*</div>
            <div className="rerouteCardSubContainer">
              <div className="rerouteText" style={rerouteText()}>
                If you were looking for emily and ehler's wedding website, click here:
              </div>
              <Link to="/ehlerandemily" className="rerouteButton" style={rerouteButton()}>
                wedding
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Orngard;
