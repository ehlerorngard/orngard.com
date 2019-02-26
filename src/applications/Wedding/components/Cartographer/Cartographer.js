import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Drawer, AppBar, IconButton, List, ListItem } from "material-ui";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { updateStore } from "../../utils/action.js";
import "../../Wedding.css";
import Main from "../Main/Main.js";
import Navbar from "../Navbar/Navbar.js";
import Menubar from "../Menubar/Menubar.js";
import Rsvp from "../Rsvp/Rsvp.js";
import Thanks from "../Thanks/Thanks.js";

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Cartographer extends Component {

  componentDidMount() {
    this.getScreenSize();
    setTimeout(function() {window.scroll(0, 0)}, 2000);
    this.handleScroll();
    updateStore({ rsvpOpen: false, sidebarVisible: false, dropOpen: false })(this.props.dispatch);
    window.addEventListener("resize", this.getScreenSize, true);
    window.addEventListener("scroll", this.handleScroll, true);
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
    console.log('pageYOffset: ', window.pageYOffset);
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

}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
  }
}

export default connect(mapStateToProps)(Cartographer);