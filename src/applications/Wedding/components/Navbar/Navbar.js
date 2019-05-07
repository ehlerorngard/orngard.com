import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Popover, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem } from "@material-ui/core";
import "../../Wedding.css";
import { updateStore } from "./navbarActions.js";
import Drop from "../Drop/Drop.js";

export class Navbar extends Component {
	constructor(props) {
		super(props);
    // The anchorEl required for Material-UI's dropdown ("Popper") only works
    // with component state, not with universal (Redux) store
		this.state = {};
	}

	componentDidMount() {
		this.hideSidebar()
	}

	getNavbarStyles = () => {
		return (this.props.scrolledToTop)
		? { backgroundColor: "rgba(184, 184, 184, 0)" }
		: { backgroundColor: "rgba(184, 184, 184, 0.7)" }
	}

	showSidebar = () => {
    // Update the locations of the div elements used for navigation,
    // now that we know they are fully loaded:
    this.props.updateDivTops();

		updateStore({ sidebarVisible: true })(this.props.dispatch);
	}

	hideSidebar = () => {
		updateStore({ sidebarVisible: false })(this.props.dispatch);
	}

  showDrop = (event) => {
  	this.setState({ anchorEl: event.currentTarget });
    updateStore({ dropOpen: true })(this.props.dispatch);
  }

  hideDrop = () => {
    updateStore({ dropOpen: false })(this.props.dispatch);
  }

  goToHome = () => {
    this.hideDrop();
    window.scroll(0, 0);
  }

  goToRSVP = () => {
    updateStore({ dropOpen: false, rsvpOpen: true })(this.props.dispatch);
  }

  goToLogin = () => {
    console.log("goToLogin NAVBAR firing...");
    updateStore({ dropOpen: false, loginOpen: true })(this.props.dispatch);
  }

  render() {
  	const navStyle = (this.props.scrolledToTop) 
  		? { backgroundColor: "rgba(184, 184, 184, 0)" }
  		: { backgroundColor: "rgba(184, 184, 184, 0.7)" };

  	const textBoxStyle = () => {
	  	if (this.props.scrolledToTop) {
	  		if (this.props.screenSize === "mobile") {
	  			return { 
	  				fontSize: "70px", 
	  				margin: "8px 8px 0 8px", 
	  				padding: "0px 20px",
	  				backgroundColor: "rgba(184, 184, 184, 0.7)",
	  				borderRadius: "40px",
            float: "left",
	  			}
	  		}
	  		else return { fontSize: "130px", margin: "60px 8px 0 8px", padding: "0px 10px 6px 10px" }
	  	}
	  	else if (this.props.screenSize === "mobile") return { fontSize: "56px", margin: "0 8px", padding: "0px 10px 6px 10px" }
	  	else return { fontSize: "70px", margin: "0 8px", padding: "0px 10px 6px 10px" }
  	}

    const ehlerandemily = (this.props.screenSize === 'mobile' && !this.props.scrolledToTop)
      ? `e + e`
      : `ehler & emily`;
  	const triggerStyle = (this.props.scrolledToTop) 
  		? { fontSize: "32px", transition: ".4s", minWidth: "36px", minHeight: "36px", padding: "4px 7px", display: "inline-table" }
  		: { fontSize: "28px", transition: ".4s", minWidth: "36px", minHeight: "36px", padding: "4px 5px", display: "inline-table" };

    const buttonBoxStyle = (this.props.scrolledToTop) 
      ? { minWidth: "128px", display: "inline-flex", float: "right" }
      : { minWidth: "108px", display: "inline-flex", float: "right" };

  	const userStyle = (this.props.scrolledToTop) 
  		? { backgroundColor: "rgba(184, 184, 184, 0.7)", fontSize: "36px", display: "inline-table", transition: ".4s", minWidth: "36px", minHeight: "36px", }
  		: { backgroundColor: "rgba(184, 184, 184, 0.9)", fontSize: "30px", display: "inline-table", transition: ".4s", minWidth: "36px", minHeight: "36px", };

  	const buttonStyle = (this.props.scrolledToTop) 
  		? { fontSize: "36px" }
  		: { fontSize: "30px" };

  	const iconStyle = (this.props.scrolledToTop) 
  		? { width: "40px" }
  		: { width: "30px" };

  	const menuIcon = require('../../assets/icons/^menuIconWhite.svg');
  	const avatar = require('../../assets/icons/^portraitAvatar.svg');

    const dropContents = () => {
      if (this.props.authenticated === true) {
        return (        
            <MenuList>
              <MenuItem onClick={this.goToRSVP}>edit RSVP</MenuItem>
              <MenuItem>sign out</MenuItem>
            </MenuList>)
      }
      else return (
          <MenuList>
            <MenuItem onClick={this.goToLogin}>log in</MenuItem>
          </MenuList> )
    }

    return (
        
        <div className="navbar" style={navStyle}>

          <div style={buttonBoxStyle}>
          	<div className="navUser" style={userStyle} onClick={this.showDrop}>
          		{(this.props.screenSize !== "mobile") 
                ? (<div>
                    <div className="navButtonText">
                			{(this.props.user && this.props.user.firstName !== null) ? this.props.user.firstName : `stranger`}
                		</div>
                		<img className="material-icons mIcons navIconMarginBottom" src={avatar} style={iconStyle}/>
                  </div>)
                : (<img className="material-icons mIcons alignCenter" src={avatar} style={iconStyle}/>)
              }
          	</div>

            <div className="sidebarTrigger" onClick={this.showSidebar} style={triggerStyle}>
              {(this.props.screenSize !== "mobile") 
              ? (<div>
                  <div className="navButtonText" style={buttonStyle}>
                    menu
                  </div>
                  <img className="material-icons mIcons navIconMarginBottom" src={menuIcon} style={iconStyle}/>
                </div>)
              : (<img className="material-icons mIcons alignCenter" src={menuIcon} style={iconStyle}/>)}
            </div>
          </div>

          <Popper 
            open={this.props.dropOpen} 
            anchorEl={this.state.anchorEl} 
            transition 
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.hideDrop}>
                    {dropContents()}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <div className="leftTextBox" style={textBoxStyle()}>{ehlerandemily}</div>

        </div>
    );
  }
}

Navbar.propTypes = {
  // field3: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	user: PropTypes.object,
	sidebarVisible: PropTypes.bool,
	scrolledToTop: PropTypes.bool,
	showSidebar: PropTypes.func,
	hideSidebar: PropTypes.func,
	anchorEl: PropTypes.object,
	dropOpen: PropTypes.bool,
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		sidebarVisible: state.sidebarVisible,
		scrolledToTop: state.scrolledToTop,
		screenSize: state.screenSize,
		anchorEl: state.anchorEl,
		dropOpen: state.dropOpen,
    divTops: state.divTops,
    updateDivTops: state.updateDivTops,
	}
}

export default connect(mapStateToProps)(Navbar);
