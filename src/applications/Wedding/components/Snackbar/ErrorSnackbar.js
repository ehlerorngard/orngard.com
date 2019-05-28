import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';


// The `withStyles()` higher-order component is injecting a `classes` property,
// which includes the styles delineated below, used to override defaults.
const styles = theme => ({
  message: {
    fontSize: "20px",
    maxWidth: 500,
  },
  anchorOriginBottomLeft: {
    background: "rgba(179, 75, 15, 1)",
  },

  MuiSnackbarContent: {
    message: {
      fontSize: "20px",
    },
    anchorOriginBottomCenter: {
      marginBottom: 12,
    },
  },
});


class ErrorSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.notes || '',
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={this.props.closeErrorSnackbar}
        onEntered={this.props.closeErrorSnackbarInAFew}
      >
        <SnackbarContent 
          classes={{root: classes.anchorOriginBottomLeft, message: classes.message}}
          aria-describedby='message-id'
          message={<span id="message-id">{this.props.errorText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="closeX"
              onClick={this.props.closeErrorSnackbar}
            >
              <Close size="large" />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(ErrorSnackbar)