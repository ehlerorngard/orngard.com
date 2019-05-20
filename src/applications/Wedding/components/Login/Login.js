import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@material-ui/core";
// import { AppBar, IconButton, SelectField, MenuItem, RadioButton, RadioButtonGroup, Divider } from "@material-ui/core";
import { updateStore, getInvitees, getRsvp } from "../../utils/action.js";
import "../../Wedding.css";


class Login extends Component {

  componentDidMount() {
    getInvitees()(this.props.dispatch);
    updateStore({ encounteredLoginError: false, loginErrorText: '' })(this.props.dispatch);
  }

  handleChange = (name) => (event) => {
    updateStore({ [name]: event.target.value })(this.props.dispatch);
  }

  updateAttending = (event, value) => {
    updateStore({ [event.target.name]: value })(this.props.dispatch);
  }

  openContact = () => {
    updateStore({ loginOpen: false, contactOpen: true, encounteredLoginError: false })(this.props.dispatch);
  }

  closeLogin = () => {
    updateStore({ loginOpen: false, encounteredLoginError: false })(this.props.dispatch);
  }

  // If the user authenticates, returns his/her RSVP id,
  // otherwise returns false:
  match = () => {
    if (!this.props.firstName || this.props.firstName.trim() === '') return false;
    const { firstName, lastName, zipCode } = this.props.user;
    this.props.allInvitees.forEach(inv => {
      if (firstName.trim() === inv.firstName && 
          lastName.trim() === inv.lastName && 
          zipCode.trim() === inv.zipCode) {
        return inv;
      }
    });
    return false;
  }
  logout = () => {
    updateStore({ 
      user: { firstName: null },
      rsvp: { id: null },
      rsvpId: null,
      loggedIn: false,
      encounteredRsvpError: false,
      rsvpOpen: false,
    })(this.props.dispatch);
  }
  login = () => {
    const matchFound = this.match();
    if (matchFound) {
      updateStore({ 
        user: matchFound,
        rsvpId: matchFound.rsvp,
        loginOpen: false, 
        loggedIn: true,
      })(this.props.dispatch);

      getRsvp(matchFound)(this.props.dispatch);
    }
    else {
      updateStore({ 
        encounteredLoginError: true,
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

    const loginErrorTextStyle = (this.props.screenSize === "mobile")
      ? { display: "block", minHeight: "120px", margin: "24px 0 0 0", fontSize: "16px", fontFamily: "Roboto", color: "#263238" }
      : { display: "block", minHeight: "120px", margin: "40px 24px 0 0", fontSize: "24px", fontFamily: "Roboto", color: "#263238" };

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

    const loginErrorText = (this.props.encounteredLoginError) ?
    (<div style={fader}>
      <div>No match was found on the list for the name entered...</div>
      <div>If you see a mistake or alternative, try again; otherwise send us a quick note about it via the CONTACT US button below and we'll fix it and get back to you!</div>
    </div>) 
    : 
    (<div syle={fader}>
      <div />
    </div>);

    const actions = (this.props.encounteredLoginError) ?
    (<DialogActions >
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
    : 
    (<DialogActions >
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
              <div style={loginErrorTextStyle}>{loginErrorText}</div>
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