import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, FlatButton, TextField } from "material-ui";
// import { AppBar, IconButton, SelectField, MenuItem, RadioButton, RadioButtonGroup, Divider } from "material-ui";
import { updateStore, getInvitees, getRsvp } from "../../utils/action.js";
import "../../Wedding.css";

// import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import ActionInfo from 'material-ui/svg-icons/action/info';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


class Login extends Component {

  componentDidMount() {
    getInvitees()(this.props.dispatch);
    updateStore({ encounteredLoginError: false, loginErrorText: '' })(this.props.dispatch);
  }


  handleChange = (name) => (event) => {
    console.log('handlChange, event = ', event);
    console.log("value: ", event.target.value);
    updateStore({ [name]: event.target.value })(this.props.dispatch);
  }

  updateAttending = (event, value) => {
    updateStore({ [event.target.name]: value })(this.props.dispatch);
  }

  openContact = () => {
    updateStore({ loginOpen: false, contactOpen: true })(this.props.dispatch);
  }

  // If the user authenticates, returns his/her RSVP id,
  // otherwise returns false:
  match = () => {
    if (this.props.firstName.trim() === '') return false;
    const { firstName, lastName, zipCode } = this.props;
    this.props.allInvitees.forEach(inv => {
      if (firstName === inv.firstName && 
          lastName === inv.lastName && 
          zipCode === inv.zipCode) {
        updateStore({ user: inv })(this.props.dispatch);
        return inv.rsvp;
      }
    });
    return false;
  }

  login = () => {
    const matchFound = this.match();
    if (matchFound) {
      updateStore({ loginOpen: false })(this.props.dispatch);
      getRsvp(matchFound)(this.props.dispatch);
    }
    else {
      updateStore({ 
        encounteredLoginError: true,
        loginErrorText: `could not find a match on the list for the name entered
          if you see an error, try again;  
          otherwise send us a quick note about it and we'll fix it and get back to you!` 
      })(this.props.dispatch);
    }

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
    const textFieldsStyle = {};
    const loginErrorTextStyle = {};

    const renderMessage = () => {
      const style = {margin: "15px"};
      if (this.props.loggedIn === true) {
        return (
          <div>
            <div style={style}>you're alread logged in...</div>
          </div> )
      }
      else return (
        <div> 
          <div style={style}>log in to access your RSVP</div>
        </div> );
    }

    const actions = (this.props.encounteredLoginError) ?
    [
      <FlatButton
        label="contact us"
        primary={true}
        keyboardFocused={true}
        onClick={this.openContact}
      />,
      <FlatButton
        label="cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="log in"
        primary={true}
        keyboardFocused={true}
        onClick={this.login}
      />,
    ] : 
    [
      <FlatButton
        label="cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="log in"
        primary={true}
        keyboardFocused={true}
        onClick={this.login}
      />,
    ];

    return (
      <div className="Login"> 
        <Dialog
          modal={false}
          actions={actions}
          open={this.props.loginOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={headerStyle}>{renderMessage()}</div>
          <form className='loginForm' noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="first name"
              className='loginTextFields'
              value={this.props.firstName}
              onChange={this.handleChange('firstName')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="last name"
              className='loginTextFields'
              value={this.props.lastName}
              onChange={this.handleChange('lastName')}
              margin="normal"
              variant="outlined"
            />

          </form>
          <div style={loginErrorTextStyle}>{this.props.loginErrorText}</div>
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
  zipCode: PropTypes.number,
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

    encounteredLoginError: PropTypes.bool,
    contactOpen: PropTypes.bool,
    loginErrorText: PropTypes.string,
    loggedIn: PropTypes.bool,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string,
    userId: PropTypes.number,
    rsvpId: PropTypes.number,
    zipCode: PropTypes.number,
    allInvitees: PropTypes.array,
    firstName: state.firstName,
    lastName: state.lastName,
    attending: state.attending,
    numAdults: state.numAdults,
    camping: state.camping,
    arrivalDay: state.arrivalDay,
  }
}

export default connect(mapStateToProps)(Login);