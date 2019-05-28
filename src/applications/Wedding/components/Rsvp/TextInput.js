import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { OutlinedInput, TextField } from '@material-ui/core';

// The `withStyles()` higher-order component is injecting a `classes` property,
// which includes the styles delineated below, used to override defaults.
const styles = theme => ({
  multiline: {
    margin: theme.spacing.unit,
    minWidth: 310,
  },
  wide: {
    margin: theme.spacing.unit,
    minWidth: 310,
  },
});


class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event);
  }

  render() {
    const { classes } = this.props;
    
    return (this.props.version === "multiline")
      ? (<TextField
          multiline={true}
          rows={4}
          label="additional notes or comments"
          className='loginTextFields'
          value={this.state.value}
          name="additionalNotes"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          classes={{ root: classes.multiline }}
        />)
      : (<TextField
          inputProps={classes.wide}
          label="email address"
          className='loginTextFields'
          value={this.state.value}
          name="email"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          classes={{ root: classes.wide }}
        />);
  }
}

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(TextInput)