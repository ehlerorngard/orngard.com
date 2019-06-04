/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Drawer, IconButton, Popover, Menu, MenuItem, Divider } from "@material-ui/core";
import { updateStore } from "../../utils/actions.js";
import "../../Wedding.css";

class Drop extends Component {

  componentDidMount() {
    this.hideDrop();  
  }

  showDrop = () => {
    updateStore({ dropOpen: true })(this.props.dispatch);
  }

  hideDrop = () => {
    updateStore({ dropOpen: false })(this.props.dispatch);
  }

  logOut = () => {
    updateStore({ user: null, rsvpId: null, loggedIn: false, authenticated: false })
  }

  goToHome = () => {
    this.hideDrop();
    window.scroll(0, 0);
  }

  goToRSVP = () => {
    updateStore({ dropOpen: false, rsvpOpen: true })(this.props.dispatch);
  }

  goToLogin = () => {
    console.log("goToLogin DROP firing...");
    updateStore({ dropOpen: false, loginOpen: true })(this.props.dispatch);
  }




  render() {
    const { sidebarVisible } = this.props;
    const headerStyle = { cursor: 'pointer' };
    const iconStyle = { width: '48px'};

    const menubarStyle = { 
      fontFamily: "Lato !important",
      fontSize: "48px !important", 
    }

    const envelope = require('../../assets/icons/^envelope.svg');
    const calendar = require('../../assets/icons/^calendar.svg');
    const navArrow = require('../../assets/icons/^navArrow.svg');
    const phone = require('../../assets/icons/^phone.svg');


    const dropContents = () => {
      if (this.props.loggedIn === true) {
        return (        
            <Menu>
              <MenuItem primaryText="edit RSVP" onClick={this.goToRSVP} />
              <MenuItem primaryText="settings" />
              <MenuItem primaryText="sign out" onClick={this.logOut} />
            </Menu>)
      }
      else return (
          <Menu>
            <MenuItem primaryText="log in" onClick={this.goToLogin}/>
          </Menu> )
    }

    return (
      <div className="dropWrapper"> 
        {dropContents()}
      </div>
    );
  }
}

Drop.propTypes = {
  sidebarVisible: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    authenticated: state.authenticated,
    loggedIn: state.loggedIn,
    dropOpen: state.dropOpen,
    anchorEl: state.anchorEl,
  }
}

export default connect(mapStateToProps)(Drop);