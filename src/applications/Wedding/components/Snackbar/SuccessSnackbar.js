import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { indigo } from '@material-ui/core/colors';

// The `withStyles()` higher-order component is injecting a `classes` property

import cx from 'classnames';


const styles = theme => ({

  message: {
    fontSize: "24px",
    maxWidth: 500,
    color: indigo['100'],
    opacity: 1,
  },
  paper: {
    opacity: .9,
  },
  margin: {
    marginBottom: 16,
  },

});

class SuccessSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.successSnackbarOpen}
        autoHideDuration={6000}
        classes={{root: classes.margin}}
        onEntered={this.props.closeSuccessSnackbarInAFew}
      >
        <SnackbarContent 
          classes={{root: classes.paper, message: classes.message}}
          aria-describedby='message-id'
          message={<span id="message-id">{this.props.successText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="closeX"
              onClick={this.props.closeSuccessSnackbar}
            >
              <Close size="large" />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

SuccessSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SuccessSnackbar)