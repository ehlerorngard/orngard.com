import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Input, Button, TextField, AppBar, Select, MenuItem, Radio, RadioGroup, Divider, FormLabel, FormControl, FormControlLabel, InputLabel, Checkbox, ListItemText, ListItemIcon, Paper, MenuList, Snackbar, IconButton, GridList, GridListTile, ClickAwayListener, Typography } from "@material-ui/core";
import { Send, Close } from '@material-ui/icons';
import { updateStore, updateRsvp, getRsvp, getInvitee, updateInvitee } from "../../utils/action.js";
import "../../Wedding.css";

import DropSelect from './DropSelect.js';
import TextInput from './TextInput.js';
import ErrorSnackbar from '../Snackbar/ErrorSnackbar.js';


class Rsvp extends Component {
  constructor(props) {
    super(props);
    // the MaterialUI text input components only 
    // work with component state, not with redux store:
    this.state = {}; 
  }

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
      FridayDinner: null, 
      SaturdayBreakfast: null, 
      SaturdayLunch: null, 
      SaturdayDinner: null, 
      SundayBrunch: null,
      encounteredRsvpError: false,
      rsvpErrorText: null,
      rsvpErrorSnackbarOpen: false,
    })(this.props.dispatch);
  }

  handleChange = (event) => {
    updateStore({ [event.target.name]: event.target.value })(this.props.dispatch);
  }

  handleChangeAttending = (event) => {
    let val = (event.target.value === "true") ? true : false;
    updateStore({ [event.target.name]: val })(this.props.dispatch);
  }

  handleNameChange = (event, id, name) => {
    this.setState({ [name]: event.target.value });

    const newList = this.props.attendeesPossible.map(poss => {
      if (poss.id === id) return {...poss, [name]: event.target.value};
      else return poss;
    })
    updateStore({ attendeesPossible: newList })(this.props.dispatch);
    if (id === this.props.user.id) {
      updateStore({ 
        user: {...this.props.user, [name]: event.target.value }
      })(this.props.dispatch);
    }
  }

  selectFirstName = (id) => {
    updateStore({ firstNameSelected: id })(this.props.dispatch);
  }

  selectLastName = (id) => {
    updateStore({ lastNameSelected: id })(this.props.dispatch);
  }

  toggleCheckbox = (guest) => {
    const index = this.props.attendeesPossible.indexOf(guest);
    let guestArray = [...this.props.attendeesPossible];
    guestArray[index].attending = !guestArray[index].attending;

    updateStore({ attendeesPossible: guestArray })(this.props.dispatch);
  }

  toggleMealCheckbox = (meal) => {
    updateStore({ [meal]: !this.props[meal] })(this.props.dispatch);
  }

  editize = (e, id, name) => {
    updateStore({ [name + "Selected"]: id })(this.props.dispatch);
  }

  textify = () => {
    updateStore({ firstNameSelected: null, lastNameSelected: null })(this.props.dispatch);
  }

  closeThanks = () => {
    updateStore({ thanksOpen: false })(this.props.dispatch);
  }

  someoneAttending = () => {
    let someone = false;
    this.props.attendeesPossible.forEach(atn => {
      if (atn.attending === true) someone = true;
    });
    return someone;
  }

  atLeastOneMeal = () => {
    let meal = false;
    const mealValues = ["FridayDinner", "SaturdayBreakfast", "SaturdayLunch", "SaturdayDinner", "SundayBrunch"];
    mealValues.forEach(comida => {
      if (this.props[comida] === true) meal = true;
    });
    return meal;
  }

  validate = () => {
    const { attending, lodging, arrivalDay, departureDay } = this.props;
    // Make sure all inputs are fulfilled as required;
    // if not, update the error text and return "false", 
    // preventing a PUT call to the database:
    if (this.props.rsvp.id) {
      if (attending === false) {
        return true;
      }
      else if (attending !== true) {
        // Attending is not "false" and therefore should be "true":
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: 'Must mark "yes" or "no" to attending',
        })(this.props.dispatch);
        return false;
      }
      else if (attending === true && this.someoneAttending() === false) {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: 'RSVP shows attending "yes", but no guest is checked as coming',
        })(this.props.dispatch);
        return false;
      }
      else if (arrivalDay === null) {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: "Must indicate an expected arrival day (you can always change it later)",
        })(this.props.dispatch);
        return false;
      }
      else if (departureDay === null) {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: "Must indicate an expected departure day (you can always change it later)",
        })(this.props.dispatch);
        return false;
      }
      else if (lodging === null) {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: "Must indicate planned lodging (you can always change it later)",
        })(this.props.dispatch);
        return false;
      }
      else if (lodging === null || lodging === undefined || lodging === '') {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: "Must indicate planned lodging (you can always change it later)",
        })(this.props.dispatch);
        return false;
      }
      else if (this.atLeastOneMeal() !== true) {
        updateStore({ 
          encounteredRsvpError: true,
          rsvpErrorText: "Please pretend to eat at least one meal with us!",
        })(this.props.dispatch);
        return false;
      }
      // Everything checks out:
      else return true;
    }
    // No rvsp is loaded:
    else return false;
  }

  submit = () => {
    // If it validates, update RSVP in the database:
    if (this.validate() === true) {
      updateRsvp(this.props.rsvp.id, { 
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
        FridayDinner: this.props.FridayDinner, 
        SaturdayBreakfast: this.props.SaturdayBreakfast, 
        SaturdayLunch: this.props.SaturdayLunch, 
        SaturdayDinner: this.props.SaturdayDinner, 
        SundayBrunch: this.props.SundayBrunch,
        submitted: true,
        encounteredRsvpError: false,
        rsvpErrorText: "",
      })(this.props.dispatch);

      this.props.attendeesPossible.forEach(guest => {
        updateInvitee(guest.id, guest, this.props.attendeesPossible)(this.props.dispatch);
      })

      // Open the "Thanks for doing the RSVP" dialog:
      updateStore({ rsvpOpen: false, thanksOpen: true })(this.props.dispatch);
      setTimeout(this.closeThanks, 7000);
    }
    else {
      // "Your RSVP is missing something"
      updateStore({ 
        encounteredRsvpError: true,
        rsvpErrorSnackbarOpen: true,
      })(this.props.dispatch);
    }

  }

  logout = () => {
    updateStore({ 
      user: { firstName: null },
      rsvp: { id: null },
      rsvpId: null,
      loggedIn: false,
      encounteredRsvpError: false,
      rsvpOpen: false,
      rsvpErrorSnackbarOpen: false,
    })(this.props.dispatch);
  }

  loadSample = () => {
    getInvitee(1001)(this.props.dispatch);
    getRsvp(1001)(this.props.dispatch);
  }

  closeErrorSnackbar = () => {
    updateStore({ 
      rsvpErrorSnackbarOpen: false,
    })(this.props.dispatch);   
  }

  closeErrorSnackbarInAFew = () => {
    setTimeout(this.closeErrorSnackbar, 5000);
  }

  closeRsvp = () => {
    updateStore({ 
      rsvpOpen: false,
      encounteredRsvpError: false,
      rsvpErrorText: null,
    })(this.props.dispatch);
  }

  goToLogin = () => {
    this.closeRsvp();
    updateStore({ loginOpen: true })(this.props.dispatch);
  }


  render() {
    const dialogStyle = (this.props.screenSize === "mobile")
      ? { padding: "10px", }
      : { padding: "44px !important", }
    const headerStyle = { cursor: 'pointer' };
    const iconStyle = { width: '48px'};

    const bajoHeader = { fontStyle: 'italic', fontWeight: 300, fontSize: "24px", padding: "12px", maxWidth: "700px", display: "block", marginLeft: "auto", marginRight: "auto", }
    const questionStyle = 
      (this.props.screenSize === "mobile")
      ? { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" }
      : { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" };

    const questionRow = (this.props.screenSize === "mobile")
      ? { padding: "20px 0", display: "block", minHeight: "100px", minWidth: "280px" }
      : { padding: "6px 12px 6px 0px", display: "inline-table", minHeight: "100px", minWidth: "300px" };

    const dropSelectBox = (this.props.screenSize === "mobile")
      ? { padding: "20px 0", display: "block", minHeight: "100px", minWidth: "280px" }
      : { padding: "6px 12px 6px 0px", minHeight: "100px", minWidth: "300px" };

    const dropSelectRow = { display: "inline-flex" };

    const leftColumnRsvp = (this.props.screenSize === "mobile")
      ? { display: "block", margin: 0, padding: 0, }
      : { display: "flex", overflowY: "hidden", padding: 3, margin: 3 };

    const rightColumnRsvp = (this.props.screenSize === "mobile")
      ? { display: "block", margin: 0, padding: 0, }
      : { display: "inline", width: "30% !important", };

    const theRightColumn = (this.props.attending === true)
      ? ((this.props.screenSize === "mobile")
          ? { padding: "20px 0", display: "block", minHeight: "100px", minWidth: "280px" }
          : { padding: "6px 12px 6px 0px", display: "inline-table", minHeight: "100px", minWidth: "300px" })
      : { display: "none" };

    const willAttendWrapperStyle = (this.props.screenSize === "mobile")
      ? { padding: "20px 0", display: "block", minHeight: "100px", minWidth: "280px" }
      : { padding: "6px 12px 6px 0px", display: "flex", minHeight: "100px", minWidth: "300px" };

    const gridWrap = { display: "flex", flexWrap: "wrap", justifyContent: 'space-around', overflow: "hidden", };

    const radioButton = {
      marginBottom: 16,
    }
    const willAttendStyle = (this.props.screenSize === "mobile")
      ? { fontSize: "22px", }
      : { fontSize: "28px", width: "auto", };

    const radioLabelStyle = { display: "block", width: "120px !important", }

    const rsvpHeaderText = () => (this.props.user.id === 1001)  
      ? `Please feel free to test all features of the RSVP form, 
      including submitting & saving – this is just a sample ;)`
      : null;
    const radioBox = { width: "140px", paddingLeft: "44px"}

    const mediumText = (this.props.screenSize === "mobile")
      ? { fontSize: "22px", margin: "12px 0", }
      : { fontSize: "30px", margin: "18px 0", };

    const labelText = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "8px 8px 8px 0", }
      : { fontSize: "20px", margin: "14px 14px 14px 0", };

    const shouldDisplay = (this.props.encounteredRsvpError) 
      ? "1" : "0"

    const errorTextStyle = (this.props.screenSize === "mobile")
      ? { padding: "20px",  
          fontSize: "18px", 
          fontFamily: "Montserrat", 
          background: "rgba(134, 58, 35, 1)", 
          color: "white", 
          border: "1px solid gray", 
          borderRadius: "4px", 
          display: "block",
          transition: ".5s",
          opacity: shouldDisplay,
        }
      : { padding: "6px",  
          fontSize: "20px", 
          fontFamily: "Montserrat", 
          background: "rgba(134, 58, 35, 1)", 
          color: "white", 
          border: "1px solid gray", 
          borderRadius: "4px", 
          display: "block",
          transition: ".5s",
          opacity: shouldDisplay,
        };
    const hideTheButton = (this.props.loggedIn === false)
      ? { visibility: "visible" }
      : { display: "none" };

    const getFirstName = () => {
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
    const mealTexts = ["Friday Dinner", "Saturday Breakfast", "Saturday Lunch", "Saturday Dinner", "Sunday Brunch"];
    const mealValues = ["FridayDinner", "SaturdayBreakfast", "SaturdayLunch", "SaturdayDinner", "SundayBrunch"];

    const { classes } = this.props;

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
          submit<span style={{width: "10px", height: "4px"}}/>
        <Send/>
      </Button>,
    ];

    const theRestOfTheQuestions = (this.props.attending === true)
      ? (
        <div key="content3" style={questionRow}>
          <div className='thinHorizSpacer'/>
          <div className='smallText block' style={mediumText}>guests:</div>
          <Paper className='inlineBlock'>
            <FormControl className='formControl'>
                {this.props.attendeesPossible.map(attendee => (
                  <MenuItem key={attendee.id} value={attendee}>
                    <Checkbox 
                      name='attendeesConfirmed'
                      checked={attendee.attending === true}
                      onChange={() => this.toggleCheckbox(attendee)} />
                    {(this.props.firstNameSelected === attendee.id) 
                      ? 
                        <ClickAwayListener onClickAway={this.textify}>
                          <TextField
                            id="outlined-name"
                            label="first name"
                            className={'textfieldz'}
                            inputProps={{autoFocus: true}}
                            value={this.props.attendeesPossible[this.props.attendeesPossible.indexOf(attendee)].firstName}
                            onChange={(event) => this.handleNameChange(event, attendee.id, `firstName`)}
                            margin="dense"
                            variant="outlined"
                          />
                        </ClickAwayListener>
                      : <ListItemText 
                          primary={attendee.firstName} 
                          onClick={(e) => this.editize(e, attendee.id, "firstName")}
                        /> 
                    }
                    {(this.props.lastNameSelected === attendee.id) 
                      ? 
                        <ClickAwayListener onClickAway={this.textify}>
                          <TextField
                            id="outlined-name"
                            label="last name"
                            className={'textfieldz'}
                            inputProps={{autoFocus: true}}
                            value={this.props.attendeesPossible[this.props.attendeesPossible.indexOf(attendee)].lastName}
                            onChange={(event) => this.handleNameChange(event, attendee.id, `lastName`)}
                            margin="dense"
                            variant="outlined"
                          />
                        </ClickAwayListener>
                      : <ListItemText 
                          primary={attendee.lastName} 
                          onClick={(e) => this.editize(e, attendee.id, "lastName")}
                        /> 
                    }

                    <div className='thinMarginBottom'/>
                  </MenuItem>
                ))}
            </FormControl>
          </Paper>


          <div className='fatHorizSpacer'/>

          <div style={{width: "100%", padding: 2, overflow: "hidden"}}>

          <div className="leftColumnRsvp" style={leftColumnRsvp}>

          <GridList >

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.numChildren} 
                  name='numChildren'
                  labelText='Number of children'
                  optionsTexts={numberOfChildrenTexts()} 
                  optionsValues={numberOfChildrenValues()} 
                  handleChange={this.handleChange} />
              </div>

            </GridListTile>

            <GridListTile>

              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.arrivalDay} 
                  name='arrivalDay'
                  labelText='What day do you plan to arrive?'
                  optionsTexts={arrivalDayValues} 
                  optionsValues={arrivalDayValues} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.departureDay} 
                  name='departureDay'
                  labelText='Day of departure'
                  optionsTexts={departureDayValues} 
                  optionsValues={departureDayValues} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.numVeg} 
                  name='numVeg'
                  labelText='Number of vegetarians'
                  optionsTexts={numVegTexts()} 
                  optionsValues={numVegValues()} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.numNoDairy} 
                  name='numNoDairy'
                  labelText='Number of lactose-free'
                  optionsTexts={numNoDairyTexts()} 
                  optionsValues={numNoDairyValues()} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.numNoGluten} 
                  name='numNoGluten'
                  labelText='Number of gluten-free'
                  optionsTexts={numNoGlutenTexts()} 
                  optionsValues={numNoGlutenValues()} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            <GridListTile>
              <div style={dropSelectBox}>
                <DropSelect 
                  value={this.props.lodging} 
                  name='lodging'
                  labelText='Where do you plan on lodging?'
                  optionsTexts={lodgingTexts} 
                  optionsValues={lodgingValues} 
                  handleChange={this.handleChange} />
              </div>
            </GridListTile>

            </GridList>

          </div>

        </div>

        </div>
        )
      : (<div style={{width: "100%", height: "8px"}} key="content4">
        </div>);

    const getRsvpContents = () => (this.props.loggedIn === true || this.props.sandboxMode === true)
          ? (<DialogContent key="content1">
              <div className="smallText" style={bajoHeader}>
                {rsvpHeaderText()}
              </div>

              <div style={willAttendWrapperStyle}>
                <div component="legend" className="smallText inline-block" style={willAttendStyle}>
                  Will you be attending the wedding?
                </div>
                <div className="inline-block" style={radioBox}>
                  <div syle={radioLabelStyle} className="block">
                    <Radio
                      checked={this.props.attending === true}
                      onChange={this.handleChangeAttending}
                      value={true}
                      name="attending"
                      aria-label="'true'"
                      className="inline-block"
                    />
                    <FormLabel className="inline-block">yes</FormLabel>
                  </div>
                  <div syle={radioLabelStyle} className="block">
                    <Radio
                      checked={this.props.attending === false}
                      onChange={this.handleChangeAttending}
                      value={false}
                      name="attending"
                      aria-label="'false'"
                      className="inline-block"
                    />
                    <FormLabel className="inline-block">no</FormLabel>
                  </div>
                </div>
              </div> 
              <Divider />

              {theRestOfTheQuestions}


              <div className="theRightColumn" style={theRightColumn}>
                <div className="rightColumnRsvp" style={rightColumnRsvp}>
                  <div style={{width: "300px !important"}}>
                    <div className='smallText maxW300' style={labelText}>What meals do you expect to be around for?</div>
                  </div>
                  <Paper className='inlineBlock'>
                    <FormControl className='formControl'>
                        {mealValues.map((val, i) => (
                          <MenuItem key={val} value={val}>
                            <Checkbox 
                              name='attendeesConfirmed'
                              checked={this.props[val] === true}
                              onChange={() => this.toggleMealCheckbox(val)} 
                            />
                            <Typography >{mealTexts[i]}</Typography>
                          </MenuItem>)
                        )}
                    </FormControl>
                  </Paper>
                </div>
              </div>

              <div className='thinHorizSpacer'/>

              <div style={questionRow}>
                <div className="smallText block" style={labelText}>Additional notes or comments</div>
                <TextInput 
                  handleChange={this.handleChange} 
                  notes={this.props.additionalNotes}
                />
              </div>

              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={false}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.rsvpErrorText}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className="closeX"
                    onClick={this.closeErrorSnackbar}
                  >
                    <Close size="large" />
                  </IconButton>,
                ]}
              />

              <ErrorSnackbar 
                errorSnackbarOpen={this.props.rsvpErrorSnackbarOpen}
                errorText={this.props.rsvpErrorText}
                closeErrorSnackbar={this.closeErrorSnackbar}
                closeErrorSnackbarInAFew={this.closeErrorSnackbarInAFew}
              />

            </DialogContent>)
          : (<DialogContent key="content2">
              <Typography variant='h5' className='smallText skinnyMarginBottom inline'>
                You're not logged in; try out a sample RSVP in sandbox mode:
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                label="submit"
                key={true}
                onClick={this.loadSample}
              >
                try sample RSVP
              </Button>

              <div className='thinHorizSpacer'/>
              <Typography variant='h5' className='smallText skinnyMarginBottom inline'>
                OR
              </Typography>
              <Button 
                variant="contained" 
                color="default" 
                label="submit"
                style={hideTheButton}
                key={true}
                onClick={this.goToLogin}
              >
                log in
              </Button>
            </DialogContent>);

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
          <DialogTitle>
            <Typography variant='h3'>
              {getRsvpTitle()}
            </Typography>
          </DialogTitle>
          {getRsvpContents()}
          <DialogActions className='charcoalBackground'>{actions}</DialogActions>
        </Dialog>
      </div>
    );
  }
}

Rsvp.propTypes = {
  rsvpOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.oneOf(["mobile", "tablet", "computer"]),
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
    attendeesPossible: state.attendeesPossible,
    attendeesConfirmed: state.attendeesConfirmed,
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
    FridayDinner: state.FridayDinner, 
    SaturdayBreakfast: state.SaturdayBreakfast, 
    SaturdayLunch: state.SaturdayLunch, 
    SaturdayDinner: state.SaturdayDinner, 
    SundayBrunch: state.SundayBrunch,
    additionalNotes: state.additionalNotes,
    submitted: state.submitted,
    email: state.email,
    mobileNumber: state.mobileNumber,
    rsvpSubmitted: state.rsvpSubmitted,
    encounteredRsvpError: state.encounteredRsvpError,
    rsvpErrorText: state.rsvpErrorText,
    rsvpErrorSnackbarOpen: state.rsvpErrorSnackbarOpen,
    rsvpLoaded: state.rsvpLoaded,
    firstNameSelected: state.firstNameSelected,
    lastNameSelected: state.lastNameSelected,
    loggedIn: state.loggedIn,
    sandboxMode: state.sandboxMode,
  }
}

export default connect(mapStateToProps)(Rsvp);