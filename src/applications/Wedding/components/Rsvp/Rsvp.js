import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Input, Button, TextField, AppBar, IconButton, Select, MenuItem, Radio, RadioGroup, Divider, FormLabel, FormControl, FormControlLabel, InputLabel } from "@material-ui/core";
import { updateStore, updateRsvp } from "../../utils/action.js";
import "../../Wedding.css";

import DropSelect from './DropSelect.js';
import TextInput from './TextInput.js';

import { Send } from '@material-ui/icons';

import requester from "../../utils/requester.js";


class Rsvp extends Component {

  componentDidMount() {
    updateStore({ 
      numChildren: null,
      numAdults: null,
      numVeg: null,
      numNoDairy: null,
      numNoGluten: null,
      numInviteesAlotted: null,
      attending: null,
      lodging: null,
      arrivalDay: null,
      departureDay: null,
      encounteredRsvpError: false,
      rsvpErrorText: null,
    })(this.props.dispatch)
  }


  handleChange = (event) => {
    console.log("event.target.value: ", event.target.value);
    updateStore({ [event.target.name]: event.target.value })(this.props.dispatch);
  }
  handleChangeAttending = (event) => {
    console.log('handleChangeAttending, event = ', event);
    console.log("event.target.value: ", event.target.value);
    let val = (event.target.value === "true") ? true : false;
    updateStore({ [event.target.name]: val })(this.props.dispatch);
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

  validate = () => {
    console.log("attempting to validate");
    const { attending, firstName, lastName, lodging, arrivalDay, departureDay } = this.props;
    // CHANGE THIS TO TRUE WHEN ACTUALLY LOADING RSVPs
    if (this.props.rsvpLoaded === false) {
      if (attending === false) {
        return true;
      }
      else if (attending !== true) {
        // "Must mark yes or no to attending"
        console.log("attending error");
        return false;
      }
      else if (lodging === null || lodging === undefined || lodging === '') {
        // "Field required"
        console.log("lodging error");
        return false;
      }
      else return true;
    }
  }

  submit = () => {
    console.log("submitting....");

    // If it validates, update RSVP in the database:
    if (this.validate() === true) {
      updateRsvp({ 
        attending: this.props.attending,
        lodging: this.props.lodging,
        numChildren: this.props.numChildren,
        numAdults: this.props.numAdults,
        numVeg: this.props.numVeg,
        numNoDairy: this.props.numNoDairy,
        numNoGluten: this.props.numNoGluten,
        arrivalDay: this.props.arrivalDay,
        departureDay: this.props.departureDay,
        additionalNotes: this.props.additionalNotes,
        submitted: true,
      })(this.props.dispatch);

      // Open the "Thanks for doing the RSVP" dialog:
      updateStore({ rsvpOpen: false, thanksOpen: true })(this.props.dispatch);
      setTimeout(this.closeThanks, 7000);
    }
    else {
      // "Your RSVP is missing something"
      updateStore({ 
        encounteredRsvpError: true,
        rsvpErrorText: "Uhhh... you missed something...",
      })(this.props.dispatch);
    }

  }

  closeRsvp = () => {
    updateStore({ 
      rsvpOpen: false,
      encounteredRsvpError: false,
      rsvpErrorText: null,
    })(this.props.dispatch);
  }


  render() {
    const dialogStyle = (this.props.screenSize === "mobile")
      ? { padding: "10px", }
      : { padding: "44px !important", }
    const headerStyle = { cursor: 'pointer' };
    const iconStyle = { width: '48px'};

    const bajoHeader = { fontFamily: "Roboto", fontStyle: 'italic', fontSize: "24px", padding: "12px" }
    const questionStyle = 
      (this.props.screenSize === "mobile")
      ? { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" }
      : { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" };
    const questionRow = (this.props.screenSize === "mobile")
      ? { padding: "20px", display: "block", minHeight: "100px", minWidth: "300px" }
      : { padding: "6px", display: "inline-flex", minHeight: "100px", minWidth: "300px" };
    const radioButton = {
      marginBottom: 16,
    }
    const radioLabelStyle = { display: "block", }

    const rsvpHeaderText = () => {

      let text = 'Note: feel free to test, but you did not login via the portal so no RSVP will be saved to the database.'
      return text;
    }

    const shouldDisplay = (this.props.encounteredRsvpError) 
      ? "block" : "none"

    const errorTextStyle = (this.props.screenSize === "mobile")
      ? { padding: "20px", display: "block", fontSize: "16px", }
      : { padding: "6px",  
          fontSize: "20px", 
          fontFamily: "Roboto", 
          background: "orange", 
          color: "white", 
          border: "1px solid gray", 
          borderRadius: "4px", 
          display: shouldDisplay,
        };


    const getFirstName = () => {
      console.log("Rsvp PROPS: ", this.props);
      if (this.props.user !== undefined) return this.props.user.firstName;
      else return null;
    }
    const getRsvpTitle = () => {
      let string = "RSVP";
      let name = getFirstName();
      if (name !== null) string += ` for ${name}`;
      return string; 
    }
    const numberOfChildrenTexts = () => {
        let children = ["None"];
        for (let i = 1; i < 5; i++) children.push(i);
        return children;
    }
    const numberOfChildrenValues = () => {
        let children = [0];
        for (let i = 1; i < 5; i++) children.push(i);
        return children;
    }

    const numVegTexts = () => {
        let vegetarians = ["None"];
        for (let i = 1; i < 5; i++) vegetarians.push(i);
        return vegetarians;
    }
    const numVegValues = () => {
        let vegetarians = [0];
        for (let i = 1; i < 5; i++) vegetarians.push(i);
        return vegetarians;
    }
    const numNoDairyTexts = () => {
        let milkless = ["None"];
        for (let i = 1; i < 5; i++) milkless.push(i);
        return milkless;
    }
    const numNoDairyValues = () => {
        let milkless = [0];
        for (let i = 1; i < 5; i++) milkless.push(i);
        return milkless;
    }
    const numNoGlutenTexts = () => {
        let glutenfree = ["None"];
        for (let i = 1; i < 5; i++) glutenfree.push(i);
        return glutenfree;
    }
    const numNoGlutenValues = () => {
        let glutenfree = [0];
        for (let i = 1; i < 5; i++) glutenfree.push(i);
        return glutenfree;
    }
    const arrivalDayValues = ["Thursday", "Friday", "Saturday"];
    const departureDayValues = ["Saturday", "Sunday", "Monday"];
    const lodgingTexts = ["camping", "hotel", "commute / other"];
    const lodgingValues = ["camping", "hotel", "other"];

    const { classes } = this.props;

    const errorText = (this.props.encounteredRsvpError === true) 
      ? (<div>{this.props.rsvpErrorText}</div>)
      : (<div/>);

    const actions = [
      <Button 
        variant="contained" 
        color="default" 
        key={false}
        onClick={this.closeRsvp}
      >cancel</Button>,
      <Button
        variant="contained" 
        color="secondary" 
        label="submit"
        key={true}
        onClick={this.submit}>
        submit
        <Send/>
      </Button>,
    ];

    const theRestOfTheQuestions = (this.props.attending === true)
      ? (
        <div>


          <div style={questionRow}>
            <DropSelect 
              value={this.props.numChildren} 
              name='numChildren'
              labelText='Number of children'
              optionsTexts={numberOfChildrenTexts()} 
              optionsValues={numberOfChildrenValues()} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.arrivalDay} 
              name='arrivalDay'
              labelText='What day do you plan to arrive?'
              optionsTexts={arrivalDayValues} 
              optionsValues={arrivalDayValues} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.departureDay} 
              name='departureDay'
              labelText='Day of departure'
              optionsTexts={departureDayValues} 
              optionsValues={departureDayValues} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.numVeg} 
              name='numVeg'
              labelText='Number of vegetarians'
              optionsTexts={numVegTexts()} 
              optionsValues={numVegValues()} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.numNoDairy} 
              name='numNoDairy'
              labelText='Number of lactose-free'
              optionsTexts={numNoDairyTexts()} 
              optionsValues={numNoDairyValues()} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.numNoGluten} 
              name='numNoGluten'
              labelText='Number of gluten-free'
              optionsTexts={numNoGlutenTexts()} 
              optionsValues={numNoGlutenValues()} 
              handleChange={this.handleChange} />
          </div>

          <div style={questionRow}>
            <DropSelect 
              value={this.props.lodging} 
              name='lodging'
              labelText='Where do you plan on lodging?'
              optionsTexts={lodgingTexts} 
              optionsValues={lodgingValues} 
              handleChange={this.handleChange} />
          </div>
        </div>
        )
      : (<div style={questionRow}>
        </div>)

    return (
      <div className="Rsvp"> 
        <Dialog
          actions={actions}
          fullScreen={this.props.screenSize === "mobile"}
          fullWidth={true}
          maxWidth='lg'
          scroll='paper'
          open={this.props.rsvpOpen}
        >
          <DialogTitle>{getRsvpTitle()}</DialogTitle>
          <DialogContent>
            <div style={bajoHeader}>{rsvpHeaderText()}</div>

            <div style={questionRow}>
              <FormLabel component="legend" style={radioLabelStyle}>Will you be attending the wedding?</FormLabel>
              <div syle={radioLabelStyle}>
                <Radio
                  checked={this.props.attending === true}
                  onChange={this.handleChangeAttending}
                  value={true}
                  name="attending"
                  aria-label="true"
                />
                <FormLabel>hill yiss</FormLabel>
              </div>
              <div syle={radioLabelStyle}>
                <Radio
                  checked={this.props.attending === false}
                  onChange={this.handleChangeAttending}
                  value={false}
                  name="attending"
                  aria-label="false"
                />
                <FormLabel>hill naoo</FormLabel>
              </div>
            </div> 
            <Divider />

            {theRestOfTheQuestions}
            <div style={questionRow}>
              <TextInput 
                handleChange={this.handleChange} 
                notes={this.props.additionalNotes}
                labelText='any additional notes or comments' />
            </div>
            <div style={errorTextStyle}>
              {errorText}
            </div>
          </DialogContent>
          <DialogActions>{actions}</DialogActions>
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

  user: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  zipCode: PropTypes.string,
  attending: PropTypes.bool,
  lodging: PropTypes.string,
  arrivalDay: PropTypes.string,
  departureDay: PropTypes.string,
  numVeg: PropTypes.number,
  numNoDairy: PropTypes.number,
  numNoGluten: PropTypes.number,
  numInviteesAlotted: PropTypes.number,
  numAdults: PropTypes.number,
  numChildren: PropTypes.number,
  additionalNotes: PropTypes.string,
  submitted: PropTypes.bool,
  email: PropTypes.string,
  mobileNumber: PropTypes.number,
  rsvpSubmitted: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    rsvpOpen: state.rsvpOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    thanksOpen: state.thanksOpen,

    user: state.user,
    rsvp: state.rsvp,
    firstName: state.firstName,
    lastName: state.lastName,
    zipCode: state.zipCode,
    attending: state.attending,
    lodging: state.lodging,
    arrivalDay: state.arrivalDay,
    departureDay: state.departureDay,
    numVeg: state.numVeg,
    numNoDairy: state.numNoDairy,
    numNoGluten: state.numNoGluten,
    numInviteesAlotted: state.numInviteesAlotted,
    numAdults: state.numAdults,
    numChildren: state.numChildren,
    additionalNotes: state.additionalNotes,
    submitted: state.submitted,
    email: state.email,
    mobileNumber: state.mobileNumber,
    rsvpSubmitted: state.rsvpSubmitted,
    encounteredRsvpError: state.encounteredRsvpError,
    rsvpErrorText: state.rsvpErrorText,
    rsvpLoaded: state.rsvpLoaded,
  }
}

export default connect(mapStateToProps)(Rsvp);