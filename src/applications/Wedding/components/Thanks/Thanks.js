import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { updateStore } from "../../utils/actions.js";
import "../../Wedding.css";


class Thanks extends Component {

  closeThanks = () => {
    updateStore({ thanksOpen: false })(this.props.dispatch);
  }


  render() {
    const headerStyle = { fontSize: "24px" };

    const renderMessage = () => {
      const style = { 
        margin: "15px", 
        fontFamily: "Montserrat", 
        fontSize: (this.props.screenSize === 'mobile') ? "18px" : "24px", 
        color: "#2e2e2e", 
      };
      if (this.props.attending === true) {
        return (
          <div>
            <div style={style}>YAY! We're so excited you're coming!!!</div>
            <div className='thinHorizSpacer'/>
            <div style={style}>And thanks for doing the RSVP ;)</div> 
          </div> )
      }
      else return (
        <div> 
          <div style={style}>Shoot, we're so sad you can't make it :( </div>
          <div className='thinHorizSpacer'/>
          <div style={style}>But no worries of course, we'll catch up you soon enough.</div>
          <div className='thinHorizSpacer'/>
          <div style={style}>Be well in the meantime, and thanks so much for doing the RSVP.</div>
        </div> );
    }

    const actions = [
      <Button
        label="close"
        color='default'
        onClick={this.closeThanks}
      />,
    ];

    return (
      <div className="Thanks"> 
        <Dialog
          actions={actions}
          open={this.props.thanksOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <DialogContent>
            <div style={headerStyle}>{renderMessage()}</div>
          </DialogContent>
          <DialogActions>      
            <Button 
              variant="contained" 
              color="default" 
              key={false}
              onClick={this.closeThanks}
            >close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Thanks.propTypes = {
  thanksOpen: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.oneOf(["mobile", "tablet", "computer"]),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  attending: PropTypes.bool,
  numAdults: PropTypes.number,
  camping: PropTypes.bool,
  arrivalDay: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    thanksOpen: state.thanksOpen,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    firstName: state.firstName,
    lastName: state.lastName,
    attending: state.attending,
    numAdults: state.numAdults,
    camping: state.camping,
    arrivalDay: state.arrivalDay,
  }
}

export default connect(mapStateToProps)(Thanks);