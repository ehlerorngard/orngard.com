import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, FlatButton, AppBar, IconButton, SelectField, MenuItem, RadioButton, RadioButtonGroup, Divider } from "material-ui";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { updateStore } from "../../utils/action.js";
import "../../Wedding.css";

import ContentSend from 'material-ui/svg-icons/content/send';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


class Thanks extends Component {

  componentDidMount() {

  }


  handleChange = (event, key, values) => {
    console.log('handlChange, event = ', event);
    console.log("value: ", values);
    updateStore({ [event.target.name]: event.target.value })(this.props.dispatch);
  }

  updateAttending = (event, value) => {
    updateStore({ [event.target.name]: value })(this.props.dispatch);
  }
  updateCamping = (event, value) => {
    updateStore({ camping: value })(this.props.dispatch);
  }
  updateNumAdults = (event, key, value) => {
    updateStore({ numAdults: value })(this.props.dispatch);
  }
  updateArrivalDay = (event, key, value) => {
    updateStore({ arrivalDay: value })(this.props.dispatch);
  }

  submit = () => {

    updateStore({ rsvpOpen: false })(this.props.dispatch);
  }

  render() {
    const headerStyle = { fontSize: "24px" };
    const iconStyle = { width: '48px'};

    const bajoHeader = { fontStyle: 'italic', fontSize: "24px", padding: "12px" }
    const questionStyle = 
      (this.props.screenSize === "mobile")
      ? { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" }
      : { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" };
    const questionRow = (this.props.screenSize === "mobile")
      ? { padding: "6px" }
      : { padding: "6px", display: "inline-flex", };
    const radioButton = {
      marginBottom: 16,
    }

    const renderMessage = () => {
      const style = {margin: "15px"};
      if (this.props.attending === true) {
        return (
          <div>
            <div style={style}>YAY! We're so excited you're coming!!!</div>
            <div style={style}>And thanks for doing the RSVP ;)</div> 
          </div> )
      }
      else return (
        <div> 
          <div style={style}>Shoot, we're so sad you can't make it :( </div>
          <div style={style}>But no worries of course, we'll catch up you soon enough.</div>
          <div style={style}>Be well in the meantime, and thanks so much for doing the RSVP.`</div>
        </div> );
    }

    const actions = [
      <FlatButton
        label="cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div className="Thanks"> 
        <Dialog
          modal={false}
          open={this.props.thanksOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={headerStyle}>{renderMessage()}</div>
        </Dialog>
      </div>
    );
  }
}

Thanks.propTypes = {
  thanksOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,

  firstName: PropTypes.string,
  lastName: PropTypes.string,
  attending: PropTypes.bool,
  numAdults: PropTypes.number,
  camping: PropTypes.bool,
  arrivalDay: PropTypes.string,


}

const mapStateToProps = (state) => {
  return {
    thanksOpen: state.thanksOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,

    firstName: state.firstName,
    lastName: state.lastName,
    attending: state.attending,
    numAdults: state.numAdults,
    camping: state.camping,
    arrivalDay: state.arrivalDay,
  }
}

export default connect(mapStateToProps)(Thanks);