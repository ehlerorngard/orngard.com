/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Drawer, AppBar, IconButton, List, ListItem, Divider } from "@material-ui/core";
import { Send, Inbox, Drafts } from '@material-ui/icons';
import { updateStore, getRsvp, getInvitee } from "../../utils/action.js";
import "../../Wedding.css";

import Main from "../Main/Main.js";
import Navbar from "../Navbar/Navbar.js";
import Menubar from "../Menubar/Menubar.js";
import Rsvp from "../Rsvp/Rsvp.js";
import Thanks from "../Thanks/Thanks.js";
import Login from "../Login/Login.js";

import requester from "../../utils/requester.js";

class Cartographer extends Component {

  componentDidMount() {
    this.getScreenSize();
    setTimeout(function() {window.scroll(0, 0)}, 1000);
    this.handleScroll();
    updateStore({ 
      rsvpOpen: false, 
      sidebarVisible: false, 
      dropOpen: false,
      loginOpen: false,
      thanksOpen: false,
      contactOpen: false,
      loggedIn: false,
      rsvpId: null,
      rsvpLoaded: false,
      rsvp: { id: null },
      user: { firstName: null },
      allInvitees: [],
      attendeesPossible: [],
      attendeesConfirmed: [],
    })(this.props.dispatch);
    window.addEventListener("resize", this.getScreenSize, true);
    window.addEventListener("scroll", this.handleScroll, true);

    requester.getCsrfToken();

    // for (let i = 1; i < 10; i++) {
    //   requester.deleteInvitee(i);
    // }

    // requester.createRsvp({
    //   attending: true,
    //   needTent: true,
    // })
    // .then(() => {
    //   requester.createInvitee({
    //     firstName: 'ludy',
    //     lastName: 'wittig',
    //     attending: true,
    //     rsvp: 1,
    //   })
    //   requester.createInvitee({
    //     firstName: 'ehler',
    //     lastName: 'orngard',
    //     attending: true,
    //     rsvp: 1,
    //   })
    //   requester.createInvitee({
    //     firstName: 'soli',
    //     lastName: 'orngard',
    //     attending: true,
    //   })
    // })


  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getScreenSize, true);
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  getScreenSize = () => {
    let screenSize = "";
    if (window.innerWidth < 700) screenSize = "mobile";
    else if (window.innerWidth <= 1000) screenSize = "tablet";
    else screenSize = "computer";

    updateStore({ screenSize: screenSize })(this.props.dispatch);
  }

  handleScroll = () => {
    // console.log('pageYOffset: ', window.pageYOffset);
    let scrolllocation = 
      (window.pageYOffset < 12)
      ? { scrolledToTop: true }
      : { scrolledToTop: false }

    updateStore(scrolllocation)(this.props.dispatch);
  }

  showSidebar = () => {
    updateStore({ sidebarVisible: true })(this.props.dispatch);
  }

  hideSidebar = () => {
    console.log("hiding sidebar....")
    updateStore({ sidebarVisible: false })(this.props.dispatch);
  }

  renderPresentPanel = () => {
    switch (this.props.where) {
      case "elsewhere":
        return (<div />)
      default:
        return (<Main />)
    }
  }


  render() {
    const { sidebarVisible } = this.props;
    const style = { cursor: 'pointer' };

    return (
      <div className="cartographer"> 
        <Navbar />
        {this.renderPresentPanel()}
        <Menubar />
        <Rsvp />
        <Thanks />
        <Login />
      </div>
    );
  }
}

Cartographer.propTypes = {
  // field3: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  where: PropTypes.string,
  sidebarVisible: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,
  dropOpen: PropTypes.bool,
  rsvpOpen: PropTypes.bool,
  loginOpen: PropTypes.bool,
  loggedIn: PropTypes.bool,
  rsvpId: PropTypes.number,
  allInvitees: PropTypes.array,
  loginErrorText: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    getDivHeights: state.getDivHeights,
  }
}

export default connect(mapStateToProps)(Cartographer);