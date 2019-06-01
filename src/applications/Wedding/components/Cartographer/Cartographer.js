import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStore, getInvitees } from "../../utils/action.js";
import requester from "../../utils/requester.js";
import "../../Wedding.css";

import Main from "../Main/Main.js";
import Navbar from "../Navbar/Navbar.js";
import Menubar from "../Menubar/Menubar.js";
import Rsvp from "../Rsvp/Rsvp.js";
import Thanks from "../Thanks/Thanks.js";
import Login from "../Login/Login.js";
import Contact from "../Contact/Contact.js";


class Cartographer extends Component {

  componentDidMount() {
    this.getScreenSize();

    this.establishConnection();

    this.handleScroll();

    updateStore({ 
      connection: false,
      rsvpOpen: false, 
      sidebarVisible: false, 
      dropOpen: false,
      loginOpen: false,
      thanksOpen: false,
      contactOpen: false,
      loggedIn: false,
      sandboxMode: false,
      rsvpId: null,
      rsvpLoaded: false,
      rsvp: { id: null },
      user: { firstName: null },
      allInvitees: [],
      attendeesPossible: [],
      attendeesConfirmed: [],
      divTops: {
        whereAndWhen: 100,
        schedule: 100,
        whereToStay: 100,
        whatToBring: 100,
        faqs: 100,
        howToGetThere: 100,
        conactUs: 100,
      }
    })(this.props.dispatch);

    window.addEventListener("resize", this.getScreenSize, true);
    window.addEventListener("scroll", this.handleScroll, true);

    if (this.props.screenSize !== "computer") {
      window.addEventListener("deviceorientation", this.props.getDivTops, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getScreenSize, true);
    window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("deviceorientation", this.props.getDivTops, true);
  }

  establishConnection = () => {
    requester.getCsrfToken().then(result => {
      // If a database connection was established and verified...
      if (result === true) {
        updateStore({ connection: true })(this.props.dispatch);
        getInvitees()(this.props.dispatch);
      }
      // Otherwise try again in a few seconds...
      else {
        setTimeout(function() {
          requester.getCsrfToken().then(() => getInvitees()(this.props.dispatch));
        }, 5000);
      }
    });
  }

  getScreenSize = () => {
    let screenSize = "";
    if (window.innerWidth < 700) screenSize = "mobile";
    else if (window.innerWidth <= 1025) screenSize = "tablet";
    else screenSize = "computer";

    updateStore({ screenSize: screenSize })(this.props.dispatch);
  }

  handleScroll = () => {
    let scrolllocation = 
      (window.pageYOffset < 12)
      ? { scrolledToTop: true }
      : { scrolledToTop: false }

    updateStore(scrolllocation)(this.props.dispatch);

    updateStore({ scrollTop: window.pageYOffset })(this.props.dispatch);
  }


  render() {
    return (
      <div className="cartographer"> 
        <Navbar />
        <Main />
        <Menubar />
        <Rsvp />
        <Thanks />
        <Login />
        <Contact />
      </div>
    );
  }
}

Cartographer.propTypes = {
  where: PropTypes.string,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.oneOf(["mobile", "tablet", "computer"]),
  connection: PropTypes.bool,
  allInvitees: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    connection: state.connection,
    allInvitees: state.allInvitees,
    divTops: state.divTops,
  }
}

export default connect(mapStateToProps)(Cartographer);