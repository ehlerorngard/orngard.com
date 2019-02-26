import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid, Segment, Sidebar, Menu } from "semantic-ui-react";
import { updateStore } from "../../utils/action.js";
import "../../Wedding.css";
import Main from "../Main/Main.js";
import Navbar from "../Navbar/Navbar.js";

class Cartographer extends Component {

  componentDidMount() {
    console.log("this.props (<Cartographer />): ", this.props);
  }

  showSidebar = () => {
    updateStore({ sidebarVisible: true })(this.props.dispatch);
  }

  hideSidebar = () => {
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
    console.log('this.props Carto console:', this.props);
    const { sidebarVisible } = this.props;

    return (
      <div className="cartographer"> 
        <Navbar />

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} 
              animation="overlay" 
              direction="right" 
              width="thin"
              vertical
              icon="labeled"
              inverted
              onHide={this.hideSidebar}
              onShow={console.log("IT IS WORKING")}
              visible={sidebarVisible}>
            <Menu.Item as="a">
                home
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">where & when</div>
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">RSVP</div>
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">schedule</div>
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">where to stay</div>
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">what to bring</div>
            </Menu.Item>
            <Menu.Item as="a">
                <div className="itemText">contact us</div>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            {this.renderPresentPanel()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Cartographer.propTypes = {
  // field3: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  where: PropTypes.string,
  sidebarVisible: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    where: state.where,
    sidebarVisible: state.sidebarVisible,
  }
}

export default connect(mapStateToProps)(Cartographer);