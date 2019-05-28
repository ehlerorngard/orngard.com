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

  goToHome = () => {
    this.hideSidebar();
    window.scroll(0, 0);
  }
  goToWhenAndWhere = () => {
    this.hideSidebar();
    window.scrollTo(0, this.props.divTops.whereAndWhen - 108);
  }
  goToRSVP = () => {
    this.hideSidebar();
    updateStore({ rsvpOpen: true })(this.props.dispatch);
  }
  goToSchedule = () => {
    this.hideSidebar();
    window.scroll(0, this.props.divTops.schedule - 7);
  }
  goToLodging = () => {
    this.hideSidebar();
    window.scroll(0, this.props.divTops.whereToStay - 7);  // 41.5% of bottom
  }
  goToWhatToBring = () => {
    this.hideSidebar();
    window.scroll(0, this.props.divTops.whatToBring - 10); // 61% of bottom
  }
  goToQuestions = () => {
    this.hideSidebar();
    window.scroll(0, this.props.divTops.faqs - 32);
  }
  goToArriving = () => {
    this.hideSidebar();
    window.scroll(0, this.props.divTops.howToGetThere - 10);  //8640, 82.2% of bottom
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
    const question = require('../../assets/icons/^question.svg');

    const menuIconArray = [home, navArrow, envelope, calendar, bed, suitcase, question, car, phone];
    const menuTextArray = ['home', 'where & when', 'RSVP', 'schedule', 'where to stay', 'what to bring', 'FAQs', 'how to get there', 'contact us'];
    const menuActionsArray = [this.goToHome, this.goToWhenAndWhere, this.goToRSVP, this.goToSchedule, this.goToLodging, this.goToWhatToBring, this.goToQuestions, this.goToArriving, this.goToContactUs];

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
  screenSize: PropTypes.oneOf(["mobile", "tablet", "computer"]),
}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    divTops: state.divTops,
  }
}

export default connect(mapStateToProps)(Menubar);