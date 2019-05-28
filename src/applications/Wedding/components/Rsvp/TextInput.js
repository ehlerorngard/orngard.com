import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { OutlinedInput } from '@material-ui/core';

// The `withStyles()` higher-order component is injecting a `classes` property,
// which includes the styles delineated below, used to override defaults.
const styles = theme => ({
  textInput: {
    margin: theme.spacing.unit,
    minWidth: 288,
  },
});


class TextInput extends Component {
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
      <OutlinedInput 
        multiline={true} 
        name="additionalNotes"
        value={this.state.value} 
        onChange={this.handleChange} 
        rows={4}
        classes={{ input: classes.textInput }} />
    );
  }
}

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(TextInput)