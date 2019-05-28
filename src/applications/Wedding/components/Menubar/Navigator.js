import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { List, ListItemText, ListItem, ListItemIcon, IconButton, AppBar, SwipeableDrawer } from '@material-ui/core';
import { Close } from '@material-ui/icons';


// The `withStyles()` higher-order component is injecting a `classes` property,
// which includes the styles delineated below, used to override defaults.
const styles = (theme) => ({
  drawer: {
    opacity: 0.8,
    background: '#b0b0b0',
  },
  appBar: {
    display: "block",
  },
  menuHeaderText: {
    cursor: 'pointer', 
    display: 'inline-flex', 
    fontSize: '48px', 
    fontFamily: 'Oswald',
    backgroundColor: 'gray',
  },
  list: {
    display: 'block',
    marginTop: '80px',
  },
  menuItemText: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: "Oswald",
    color: theme.palette.common.white,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 500,
  },
});


const Navigator = (props) => {
  const { classes, icons, texts, actions } = props;
  const { sidebarVisible, hideSidebar } = props;

  const headerWrapperStyle = { display: "block", minHeight: "80px !important" };

  const headerStyle = {
    display: 'inline-table',
    marginBottom: "6px",
  }
  const closeButtonWrapperStyle = (props.screenSize === 'mobile') 
    ? { display: "inline-flex", padding: '10px 10px 12px 10px', }
    : { display: "inline-flex", padding: '10px 10px 12px 10px', };

  const closeButtonStyle = (props.screenSize === 'mobile') 
    ? { verticalAlign: "middle", }
    : { verticalAlign: "middle", };

  const headerTextStyle = { 
    cursor: 'pointer', 
    display: 'inline-flex', 
    fontSize: '48px', 
    fontFamily: 'Oswald' };

  const listStyle = {
    width: '300',
    display: "block",
    marginTop: "48px !important",
  }

  const iconStyle = { width: '48px'};


  return (
    <SwipeableDrawer anchor="right" open={sidebarVisible} classes={{paper: classes.drawer}}>
      <AppBar 
        classes={{ colorPrimary: classes.menuHeaderText, root: classes.appBar }}
        style={headerStyle}
        onClick={hideSidebar}>
        <div style={closeButtonWrapperStyle}>
          <IconButton onClick={hideSidebar} style={closeButtonStyle}>
            <Close size='large' />
          </IconButton>
        </div>
        <div style={headerTextStyle}>menu</div>
      </AppBar>

      <List classes={{ root: classes.list }}>
        {texts.map((text, i) => (
          <React.Fragment key={i}>
            <ListItem button onClick={actions[i]}>
              <ListItemIcon><img alt='' src={icons[i]} /></ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.menuItemText,
                }}
              >
                {text}
              </ListItemText>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </SwipeableDrawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navigator)