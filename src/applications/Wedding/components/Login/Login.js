import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@material-ui/core";
// import { AppBar, IconButton, SelectField, MenuItem, RadioButton, RadioButtonGroup, Divider } from "@material-ui/core";
import { updateStore, getInvitees, getRsvp } from "../../utils/action.js";
import "../../Wedding.css";

import ErrorSnackbar from '../Snackbar/ErrorSnackbar.js';


class Login extends Component {

  componentDidMount() {
    getInvitees()(this.props.dispatch);
    updateStore({ 
      encounteredLoginError: false, 
      loginErrorText: '', 
      loginErrorSnackbarOpen: false,
      loginSuccessSnackbarOpen: false,
      successText: "",
      firstName: '',
      lastName: '',
      zipCode: '',
    })(this.props.dispatch);
  }

  handleChange = (name) => (event) => {
    updateStore({ [name]: event.target.value })(this.props.dispatch);
  }

  updateAttending = (event, value) => {
    updateStore({ [event.target.name]: value })(this.props.dispatch);
  }
  closeErrorSnackbar = () => {
    updateStore({ 
      loginErrorSnackbarOpen: false,
    })(this.props.dispatch);   
  }
  closeErrorSnackbarInAFew = () => {
    setTimeout(this.closeErrorSnackbar, 6200);
  }
  closeSuccessSnackbar = () => {
    updateStore({ 
      loginSuccessSnackbarOpen: false,
    })(this.props.dispatch);   
  }
  closeSuccessSnackbarInAFew = () => {
    setTimeout(this.closeSuccessSnackbar, 5000);
  }
  closeLogin = () => {
    updateStore({ loginOpen: false, encounteredLoginError: false })(this.props.dispatch);
  }
  openContact = () => {
    this.closeLogin();
    updateStore({ 
      contactOpen: true,
      loginErrorSnackbarOpen: false, 
    })(this.props.dispatch);
  }


  // If the user authenticates, returns his/her RSVP id,
  // otherwise returns false:
  match = () => {
    if (!this.props.firstName || this.props.firstName.trim() === '') return false;
    const { firstName, lastName, zipCode } = this.props;
    let theMatch = false;
    this.props.allInvitees.forEach(inv => {
      if (firstName.trim().toLowerCase() === inv.firstName.toLowerCase() && 
          lastName.trim().toLowerCase() === inv.lastName.toLowerCase() && 
          zipCode.trim() === inv.zipCode) {
        theMatch = inv;
      }
    });
    return theMatch;
  }
  logout = () => {
    updateStore({ 
      user: { firstName: null },
      rsvp: { id: null },
      rsvpId: null,
      loggedIn: false,
      encounteredRsvpError: false,
      rsvpOpen: false,
      firstName: null,
      lastName: null,
      zipCode: null,
      lodging: null,
      arrivalDay: null,
      departureDay: null,
      email: null,
      attendeesPossible: [],
    })(this.props.dispatch);
  }
  login = () => {
    const matchFound = this.match();
    console.log("inv = ", matchFound);
    if (matchFound) {
      updateStore({ 
        user: matchFound,
        rsvpId: matchFound.rsvp,
        loginOpen: false, 
        loggedIn: true,
        loginErrorSnackbarOpen: false,
        loginSuccessSnackbarOpen: true,
        successText: `Hello ${matchFound.firstName} ${matchFound.lastName}!`
      })(this.props.dispatch);

      getRsvp(matchFound.rsvp)(this.props.dispatch);
    }
    else {
      updateStore({ 
        encounteredLoginError: true,
        loginErrorSnackbarOpen: true,
      })(this.props.dispatch);
    }

  }

  render() {
    const headerStyle = (this.props.screenSize === "mobile")
      ? { fontSize: "20px", fontWeight: "700", fontFamily: "Montserrat", margin: "24px", color: '#37474f' }
      : { fontSize: "48px", fontWeight: "700", fontFamily: "Montserrat", margin: "24px", color: '#37474f' };
    const iconStyle = { width: '48px'};

    const bajoHeader = { fontStyle: 'italic', fontSize: "24px", padding: "12px" }
    const questionStyle = 
      (this.props.screenSize === "mobile")
      ? { display: "block", height: "100%", margin: "30px 24px 0 0", verticalAlign: "bottom" }
      : { display: "block", height: "100%", margin: "40px 24px 0 0", verticalAlign: "bottom" };
    const questionRow = (this.props.screenSize === "mobile")
      ? { padding: "6px" }
      : { padding: "6px", display: "inline-flex", };
    const radioButton = {
      marginBottom: 16,
    }
    const textFieldsStyle = (this.props.screenSize === "mobile")
      ? { display: "block", marginRight: "12px" }
      : { display: "inline-block", marginRight: "12px" };

    const fader = (this.props.encounteredLoginError)
      ? { opacity: '1', transition: '1.5s' }
      : { opacity: '0', transition: '1.5s' }

    const renderMessage = () => {
      const style = {margin: "15px"};
      if (this.props.loggedIn === true) {
        return (
          <div>
            <div>You've already signed in...</div>
          </div> )
      }
      else return (
        <div> 
          <div>log in to access your RSVP</div>
        </div> );
    }

    const loginErrorText = 
      // otherwise send us a quick note about it via the CONTACT US button below and we'll fix it and get back to you!
      (<div style={fader}>
        <div>No match was found on the list for the name & zip code entered...</div>
        <div className="thinHorizSpacer" />
        <div>If you see a mistake or alternative, try again, otherwise you can send us a 
          message with the CONTACT US button at the bottom of the form.
        </div>
      </div>) 

    const actions = (this.props.encounteredLoginError)
      ? (<DialogActions >
          <Button
            color='secondary'
            size='large'
            variant='contained'
            keyboardFocused={true}
            onClick={this.openContact}
          >contact us</Button>
          <Button
            label="cancel"
            size='large'
            variant='outlined'
            onClick={this.closeLogin}
          >cancel</Button>
          <Button
            label="log in"
            color="primary"
            size='large'
            variant='outlined'
            keyboardFocused={true}
            autoFocus
            onClick={this.login}
          >log in</Button>
        </DialogActions>) 
      : (<DialogActions >
          <Button
            label="cancel"
            color='default'
            size='large'
            variant='outlined'
            onClick={this.closeLogin}
          >cancel</Button>
          <Button
            label="log in"
            color="primary"
            size='large'
            variant='contained'
            keyboardFocused={true}
            autoFocus
            onClick={this.login}
          >log in</Button>
        </DialogActions>);

    return (
      <div className="Login"> 
        <Dialog
          fullScreen={this.props.screenSize === "mobile"}
          fullWidth={true}
          maxWidth='md'
          open={this.props.loginOpen}
          onRequestClose={this.closeLogin}
          autoScrollBodyContent={true}
        >
          <div style={headerStyle}>{renderMessage()}</div>
          {(this.props.loggedIn === true) 
          ? (<DialogContent >
              <Typography variant="h5" className='skinnyMarginBottom'>
                You're already logged in 
                as <span className='bold'>{this.props.user.firstName}
                <span className='inline'> </span>
                {this.props.user.lastName}</span>.
              </Typography>
              <Button
                color='default'
                size='large'
                variant='contained'
                keyboardFocused={true}
                onClick={this.logout}
              >log out</Button>
            </DialogContent>)
          : (<DialogContent >
              <form className='loginForm' noValidate autoComplete="off">
                <TextField
                  label="first name"
                  className='loginTextFields'
                  autoFocus={true}
                  style={textFieldsStyle}
                  value={this.props.firstName}
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="last name"
                  className='loginTextFields'
                  style={textFieldsStyle}
                  value={this.props.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="zip code"
                  className='loginTextFields'
                  style={textFieldsStyle}
                  value={this.props.zipCode}
                  onChange={this.handleChange('zipCode')}
                  margin="normal"
                  variant="outlined"
                />

              </form>

              <ErrorSnackbar
                errorText={loginErrorText}
                errorSnackbarOpen={this.props.loginErrorSnackbarOpen}
                closeErrorSnackbar={this.closeErrorSnackbar}
                closeErrorSnackbarInAFew={this.closeErrorSnackbarInAFew}
              />

            </DialogContent>)
          }
          {actions}
        </Dialog>
      </div>
    );
  }
}

Login.propTypes = {
  loginOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,

  firstName: PropTypes.string,
  lastName: PropTypes.string,
  zipCode: PropTypes.string,
  attending: PropTypes.bool,
  numAdults: PropTypes.number,
  camping: PropTypes.bool,
  arrivalDay: PropTypes.string,
  loginErrorText: PropTypes.string,
  match: PropTypes.func,

  allInvitees: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    loginOpen: state.loginOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    user: state.user,
    rsvp: state.rsvp,
    encounteredLoginError: state.encounteredLoginError,
    contactOpen: state.contactOpen,
    loginErrorText: state.loginErrorText,
    successText: state.successText,
    loginSuccessSnackbarOpen: state.loginSuccessSnackbarOpen,
    loginErrorSnackbarOpen: state.loginErrorSnackbarOpen,
    loggedIn: state.loggedIn,
    zipCode: state.zipCode,
    allInvitees: state.allInvitees,
    attendeesPossible: state.attendeesPossible,
    attendeesConfirmed: state.attendeesConfirmed,
    firstName: state.firstName,
    lastName: state.lastName,
    attending: state.attending,
    numAdults: state.numAdults,
    arrivalDay: state.arrivalDay,
  }
}

export default connect(mapStateToProps)(Login);