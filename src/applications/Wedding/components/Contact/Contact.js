import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@material-ui/core";
import { updateStore, createMessage } from "../../utils/action.js";
import "../../Wedding.css";

import ErrorSnackbar from '../Snackbar/ErrorSnackbar.js';

class Contact extends Component {

  componentDidMount() {
    updateStore({ 
      encounteredContactError: false, 
      contactErrorText: '', 
      contactErrorSnackbarOpen: false,
      contactSuccessSnackbarOpen: false,
      successText: "",
      firstName: '',
      lastName: '',
      email: '',
      message: '',
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
      contactErrorSnackbarOpen: false,
    })(this.props.dispatch);   
  }
  closeErrorSnackbarInAFew = () => {
    setTimeout(this.closeErrorSnackbar, 6200);
  }

  closeContact = () => {
    updateStore({ contactOpen: false, encounteredContactError: false })(this.props.dispatch);
  }

  validate = () => {
    if (!this.props.firstName) {
      updateStore({ contactErrorText: "Must include a name" })(this.props.dispatch);
      return false;
    }    
    else if (this.props.firstName.trim() === '') {
      updateStore({ contactErrorText: "Must include a name" })(this.props.dispatch);
      return false;
    }
    else if (!this.props.email) {
      updateStore({ contactErrorText: "Must include a vaild email" })(this.props.dispatch);
      return false;      
    }
    else if (this.props.email.trim() === '' || this.props.email.indexOf('@') < 0) {
      updateStore({ contactErrorText: "Must include a vaild email" })(this.props.dispatch);
      return false;
    }
    else if (!this.props.message) {
      updateStore({ contactErrorText: "There must be a message... to send a message..." })(this.props.dispatch);
      return false;
    }
    else if (this.props.message.trim() === '') {
      updateStore({ contactErrorText: "There must be a message... to send a message..." })(this.props.dispatch);
      return false;
    }
    else return true;
  }

  sendMessage = () => {

    if (this.validate() === true) {
      createMessage({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        message: this.props.message,
      })(this.props.dispatch);

      updateStore({ 
        contactErrorText: '',
        contactErrorSnackbarOpen: false,
        contactOpen: false,
        message: '',
        successText: "message sent!",
        contactSuccessSnackbarOpen: true,
      })(this.props.dispatch);
    }
    else {
      updateStore({ 
        encounteredContactError: true,
        contactErrorSnackbarOpen: true,
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

    const renderMessage = (
        <div> 
          <div>send us a message!</div>
        </div> );

    const contactErrorText = 
      // otherwise send us a quick note about it via the CONTACT US button below and we'll fix it and get back to you!
      (<div style={fader}>
        <div>{this.props.contactErrorText}</div>
      </div>) 

    const actions = 
      (<DialogActions >
          <Button
            label="cancel"
            color='default'
            size='large'
            variant='outlined'
            onClick={this.closeContact}
          >cancel</Button>
          <Button
            label="send"
            color="primary"
            size='large'
            variant='contained'
            keyboardFocused={true}
            autoFocus
            onClick={this.sendMessage}
          >send</Button>
        </DialogActions>);

    return (
      <div className="Login"> 
        <Dialog
          fullScreen={this.props.screenSize === "mobile"}
          fullWidth={true}
          maxWidth='md'
          open={this.props.contactOpen}
          onRequestClose={this.closeContact}
          autoScrollBodyContent={true}
        >
          <div style={headerStyle}>{renderMessage}</div>
            <DialogContent >
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
                  label="email"
                  className='loginTextFields'
                  style={textFieldsStyle}
                  value={this.props.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                  variant="outlined"
                />
                <div className="thinHorizSpacer" />
                <TextField
                  label="message"
                  className='loginTextFields'
                  multiline={true}
                  rows={5}
                  style={textFieldsStyle}
                  value={this.props.message}
                  onChange={this.handleChange('message')}
                  margin="normal"
                  variant="outlined"
                />

              </form>

              <ErrorSnackbar
                errorText={this.props.contactErrorText}
                errorSnackbarOpen={this.props.contactErrorSnackbarOpen}
                closeErrorSnackbar={this.closeErrorSnackbar}
                closeErrorSnackbarInAFew={this.closeErrorSnackbarInAFew}
              />

            </DialogContent>
          {actions}
        </Dialog>
      </div>
    );
  }
}

Contact.propTypes = {
  conatactOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,

  loginErrorText: PropTypes.string,
  match: PropTypes.func,

  allInvitees: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    contactOpen: state.contactOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    user: state.user,
    rsvp: state.rsvp,
    message: state.message,
    firstName: state.firstName,
    lastName: state.lastName,
    encounteredContactError: state.encounteredContactError,
    contactErrorText: state.contactErrorText,
    successText: state.successText,
    contactSuccessSnackbarOpen: state.contactSuccessSnackbarOpen,
    contactErrorSnackbarOpen: state.contactErrorSnackbarOpen,
    loggedIn: state.loggedIn,
    email: state.email,
  }
}

export default connect(mapStateToProps)(Contact);