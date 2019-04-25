import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, FlatButton, TextField, AppBar, IconButton, SelectField, MenuItem, RadioButton, RadioButtonGroup, Divider } from "material-ui";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { updateStore } from "../../utils/action.js";
import "../../Wedding.css";

import ContentSend from 'material-ui/svg-icons/content/send';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import requester from "../../utils/requester.js";


class Rsvp extends Component {

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

  closeThanks = () => {
    updateStore({ thanksOpen: false })(this.props.dispatch);
  }

  submit = () => {
    console.log("submitting....");

    // requester.createRsvp({
    //   attending: this.props.attending,
    //   numAdults: this.props.numAdults,
    // })

    requester.getInvitees();

    // requester.createInvitee({firstName: 'ehler'});

    requester.updateInvitee(2, {
      lastName: "orngard",
    })

    requester.getInvitee(3);



    updateStore({ rsvpOpen: false })(this.props.dispatch);
    if (this.props.attending !== undefined) {
      updateStore({ thanksOpen: true })(this.props.dispatch);
      setTimeout(this.closeThanks, 7000);
    }
  }

  closeRsvp = () => {
    updateStore({ rsvpOpen: false })(this.props.dispatch);
  }


  render() {
    const headerStyle = { cursor: 'pointer' };
    const iconStyle = { width: '48px'};

    // const home = require('../../assets/icons/^home.svg');
    // const envelope = require('../../assets/icons/^envelope.svg');
    // const calendar = require('../../assets/icons/^calendar.svg');
    // const bed = require('../../assets/icons/^bed.svg');
    // const navArrow = require('../../assets/icons/^navArrow.svg');
    // const suitcase = require('../../assets/icons/^suitcase.svg');
    // const phone = require('../../assets/icons/^phone.svg');


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

    const actions = [
      <FlatButton
        label="cancel"
        primary={false}
        onClick={this.closeRsvp}
      />,
      <FlatButton
        label="submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div className="Rsvp"> 
        <Dialog
          title={`RSVP for ${this.props.user.firstName || '(no name)'}`}
          actions={actions}
          modal={false}
          open={this.props.rsvpOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={bajoHeader}>Note: feel free to test, but you did not login via the portal so no RSVP will be saved to the database.</div>

          <div style={questionRow}>
            <div style={questionStyle}>Do you plan to attend?</div>
            <RadioButtonGroup name="attending" defaultSelected={null} onChange={this.updateAttending}>
              <RadioButton
                value={true}
                label="yes"
                checkedIcon={<ActionFavorite style={{color: '#F44336'}} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={radioButton}
              />
              <RadioButton
                value={false}
                label="no"
                style={radioButton}
              />
            </RadioButtonGroup>
          </div> 
          <Divider />

          <div style={questionRow}>
            <div style={questionStyle}>How many of you will be coming?</div>
            <SelectField
              floatingLabelText={(this.props.screenSize === "mobile") ? `# of guests` : null}
              name="numAdults"
              value={this.props.numAdults}
              onChange={this.updateNumAdults}
            >
              <MenuItem value={null} name="numAdults" primaryText="" />
              <MenuItem value={1} name="numAdults" primaryText="1" />
              <MenuItem value={2} name="numAdults" primaryText="2" />
              <MenuItem value={3} name="numAdults" primaryText="3" />
              <MenuItem value={4} name="numAdults" primaryText="4" />
              <MenuItem value={5} name="numAdults" primaryText="5" />
              <MenuItem value={6} name="numAdults" primaryText="6" />
              <MenuItem value={7} name="numAdults" primaryText="7" />
            </SelectField>
          </div>
          <Divider />

          <div style={questionRow}>
            <div style={questionStyle}>What day do you plan to arrive?</div>
            <SelectField
              floatingLabelText={(this.props.screenSize === "mobile") ? `arrival day` : null}
              value={this.props.arrivalDay}
              onChange={this.updateArrivalDay}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value={"Thursday"} primaryText="Thursday" />
              <MenuItem value={"Friday"} primaryText="Friday" />
              <MenuItem value={"Saturday"} primaryText="Saturday" />
            </SelectField>
          </div>
          <Divider />

          <div style={questionRow}>
            <div style={questionStyle}>Do you plan on camping?</div>
            <RadioButtonGroup name="camping" defaultSelected={null} onChange={this.updateCamping}>
              <RadioButton
                value={true}
                label="yes"
                style={radioButton}
              />
              <RadioButton
                value={false}
                label="no"
                style={radioButton}
              />
            </RadioButtonGroup>
          </div>


        </Dialog>
      </div>
    );
  }
}

Rsvp.propTypes = {
  rsvpOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,
  thanksOpen: PropTypes.bool,

  submit: PropTypes.func,
  closeThanks: PropTypes.func,

  firstName: PropTypes.string,
  lastName: PropTypes.string,
  attending: PropTypes.bool,
  numAdults: PropTypes.number,
  camping: PropTypes.bool,
  arrivalDay: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    rsvpOpen: state.rsvpOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    thanksOpen: state.thanksOpen,

    user: PropTypes.object,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userId: PropTypes.number,
    rsvpId: PropTypes.number,
    firstName: state.firstName,
    lastName: state.lastName,
    zipCode: state.zipCode,
    attending: state.attending,
    numAdults: state.numAdults,
    camping: state.camping,
    arrivalDay: state.arrivalDay,
  }
}

export default connect(mapStateToProps)(Rsvp);