import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Input, InputLabel, MenuItem } from '@material-ui/core';
import { Close } from '@material-ui/icons';


// The `withStyles()` higher-order component is injecting a `classes` property

import cx from 'classnames';


const styles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  inputLabel: {
    fontSize: '1.2rem',
  },
  dropSelect: {
    margin: 0,
    minWidth: 160,

  },
  select: {
    minHeight: '1.5em',
    whiteSpace: 'wrap',
    fontSize: '1.2rem',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  menuItem: {
    fontSize: '1.5rem',
  },
  input: {
    fontSize: '1.25rem',
    paddingLeft: '12px',
    paddingTop: '18px',
  },
});

class DropSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
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
        <FormControl classes={{ root: classes.dropSelect }} fullWidth={true}>
          <InputLabel classes={{ root: classes.inputLabel }} htmlFor={this.props.name}>{this.props.labelText}</InputLabel>
          <Select
            classes={{ select: classes.select }}
            value={this.state.value}
            name={this.props.name}
            onChange={this.handleChange}
            input={<Input required={true} name={this.props.name} id={this.props.name} classes={{ input: classes.input }}/>}
          >
            {this.props.optionsValues.map((val, i) => (
              <MenuItem value={val} key={val} classes={{ root: classes.menuItem }}>{this.props.optionsTexts[i]}</MenuItem>
            ))}
          </Select>
        </FormControl>
    );
  }
}

DropSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(DropSelect)