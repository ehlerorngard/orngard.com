import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputLabel } from '@material-ui/core';
import { Close } from '@material-ui/icons';


// The `withStyles()` higher-order component is injecting a `classes` property

import cx from 'classnames';


const styles = theme => ({

  textInput: {
    margin: theme.spacing.unit,
    minWidth: 288,
    // borderRadius: 4,
    // border: '1px solid gray',
    // padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // '&:focus': {
    //   borderRadius: 4,
    //   borderColor: '#80bdff',
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    // },
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