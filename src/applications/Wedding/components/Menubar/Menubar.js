/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStore } from "../../utils/action.js";
import Navigator from './Navigator.js';

import "../../Wedding.css";

class Menubar extends Component {
  componentDidMount() {
    this.hideSidebar();   
  }

  showSidebar = () => {
    updateStore({ sidebarVisible: true })(this.props.dispatch);
  }

  hideSidebar = () => {
    updateStore({ sidebarVisible: false })(this.props.dispatch);
  }

  // width 375 (iPhone X) – maxYscroll: 11562
  // 

  goToHome = () => {
    this.hideSidebar();
    window.scroll(0, 0);
  }
  goToWhenAndWhere = () => {
    this.hideSidebar();
    let height;
    const bottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );

    if (window.innerWidth < 500) height = bottom * .054
    else if (this.props.screenSize === "mobile") height = bottom * .059
    else if (this.props.screenSize === "tablet") height = bottom * .057
    else height = bottom * .0543;

    window.scrollTo(0, height);
  }
  goToRSVP = () => {
    this.hideSidebar();
    updateStore({ rsvpOpen: true })(this.props.dispatch);
  }
  goToSchedule = () => {
    this.hideSidebar();
    let height;
    const bottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );

    if (window.innerWidth < 500) height = bottom * .182
    else if (this.props.screenSize === "mobile") height = bottom * .18
    else if (this.props.screenSize === "tablet") height = bottom * .192
    else height = height * .18;

    window.scroll(0, height); // 1965, 18% of bottom
  }
  goToLodging = () => {
    this.hideSidebar();
    let height;

    const bottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );

    if (window.innerWidth < 500) height = bottom * .406
    else if (this.props.screenSize === "mobile") height = bottom * .41
    else if (this.props.screenSize === "tablet") height = bottom * .4153
    else if (window.innnerWidth < 1200) height = bottom * .41
    else height = bottom * .406;

    window.scroll(0, height);  // 41.5% of bottom

  }
  goToWhatToBring = () => {
    this.hideSidebar();
    let height;

    const bottom = Math.max(document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );
    if (window.innerWidth < 500) height = bottom * .616
    else if (this.props.screenSize === "mobile") height = bottom * .615
    else if (this.props.screenSize === "tablet") height = bottom * .61
    else height = bottom * .61;

    window.scroll(0, height); // 61% of bottom
  }
  goToArriving = () => {
    this.hideSidebar();
    let height;
    const bottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );
    console.log('bottom: ', bottom); 
    if (window.innerWidth < 500) height = bottom * .847
    else if (this.props.screenSize === "mobile") height = bottom * .83
    else if (this.props.screenSize === "tablet") height = bottom * .8147 // of 9672
    else height = bottom * .822
    window.scroll(0, height);  //8640, 82.2% of bottom
  }
  goToContactUs = () => {
    this.hideSidebar();
    const bottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight );
    window.scroll(0, bottom);
  }



  render() {
    const home = require('../../assets/icons/^home.svg');
    const envelope = require('../../assets/icons/^envelope.svg');
    const calendar = require('../../assets/icons/^calendar.svg');
    const bed = require('../../assets/icons/^bed.svg');
    const navArrow = require('../../assets/icons/^navArrow.svg');
    const suitcase = require('../../assets/icons/^suitcase.svg');
    const phone = require('../../assets/icons/^phone.svg');
    const car = require('../../assets/icons/^car.svg');

    const menuIconArray = [home, navArrow, envelope, calendar, bed, suitcase, car, phone];
    const menuTextArray = ['home', 'where & when', 'RSVP', 'schedule', 'where to stay', 'what to bring', 'how to get there', 'contact us'];
    const menuActionsArray = [this.goToHome, this.goToWhenAndWhere, this.goToRSVP, this.goToSchedule, this.goToLodging, this.goToWhatToBring, this.goToArriving, this.goToContactUs];

    return (
      <div className="menubarWrapper"> 

        <Navigator 
          icons={menuIconArray} 
          texts={menuTextArray} 
          actions={menuActionsArray}
          sidebarVisible={this.props.sidebarVisible}
          hideSidebar={this.hideSidebar}
          screenSize={this.props.screenSize} />
      </div>
    );
  }
}

Menubar.propTypes = {
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
  }
}

export default connect(mapStateToProps)(Menubar);