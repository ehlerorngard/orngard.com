/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Drawer, AppBar, IconButton, List, ListItem } from "material-ui";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { updateStore } from "../../utils/action.js";
import "../../Wedding.css";

// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import Divider from 'material-ui/Divider';
// import ActionInfo from 'material-ui/svg-icons/action/info';

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
    const { sidebarVisible } = this.props;
    const headerStyle = { cursor: 'pointer' };
    const iconStyle = { width: '48px'};

    const menubarStyle = { 
      fontFamily: "Lato !important",
      fontSize: "48px !important", 
    }

    const home = require('../../assets/icons/^home.svg');
    const envelope = require('../../assets/icons/^envelope.svg');
    const calendar = require('../../assets/icons/^calendar.svg');
    const bed = require('../../assets/icons/^bed.svg');
    const navArrow = require('../../assets/icons/^navArrow.svg');
    const suitcase = require('../../assets/icons/^suitcase.svg');
    const phone = require('../../assets/icons/^phone.svg');
    const car = require('../../assets/icons/^car.svg');

    return (
      <div className="menubarWrapper"> 
        <Drawer 
            width={300} 
            className="menubar"
            openSecondary={true}
            containerStyle={menubarStyle}
            open={sidebarVisible}>
          <AppBar 
            className="menuHeader"
            onClick={this.hideSidebar}
            title={<span style={headerStyle}>menu</span>} 
            iconElementRight={
              <IconButton onClick={this.hideSidebar}><NavigationClose /></IconButton>}/>
          <List>
            <ListItem
              onClick={this.goToHome}
              innerDivStyle={menubarStyle}
              leftIcon={<img className="material-icons mIcons" src={home} style={iconStyle}/>}><div style={menubarStyle}>home</div></ListItem>
            <ListItem primaryText="where & when" 
              onClick={this.goToWhenAndWhere}
              leftIcon={<img className="material-icons mIcons" src={navArrow} style={iconStyle}/>} />
            <ListItem primaryText="RSVP" 
              onClick={this.goToRSVP}
              leftIcon={<img className="material-icons mIcons" src={envelope} style={iconStyle}/>} />
            <ListItem primaryText="schedule" 
              onClick={this.goToSchedule}
              leftIcon={<img className="material-icons mIcons" src={calendar} style={iconStyle}/>} />
            <ListItem primaryText="where to stay" 
              onClick={this.goToLodging}
              leftIcon={<img className="material-icons mIcons" src={bed} style={iconStyle}/>} />
            <ListItem primaryText="what to bring" 
              onClick={this.goToWhatToBring}
              leftIcon={<img className="material-icons mIcons" src={suitcase} style={iconStyle}/>} />
            <ListItem primaryText="how to get there" 
              onClick={this.goToArriving}
              leftIcon={<img className="material-icons mIcons" src={car} style={iconStyle}/>} />
            <ListItem primaryText="contact us" 
              onClick={this.goToContactUs}
              leftIcon={<img className="material-icons mIcons" src={phone} style={iconStyle}/>} />
          </List>
        </Drawer>
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