/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import "../../Wedding.css";

// import { IconButton, List, ListItem } from "material-ui";

// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import Explore from 'material-ui/svg-icons/action/explore';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';

import Image1 from '../../assets/adventure.jpg';
import Image1lite from '../../assets/adventureLite.jpg';
import Image2 from '../../assets/theMoment.jpg';
import Image2lite from '../../assets/theMomentLite.jpg';
import Image3 from '../../assets/background4.jpg';
import Image4 from '../../assets/background3.jpg';
import Image5 from '../../assets/background5.jpg';
import Image6 from '../../assets/background6.jpg';

export class Main extends Component {

	componentDidMount() {

	}

  render() {

    const home = require('../../assets/icons/^home.svg');
    const envelope = require('../../assets/icons/^envelope.svg');
    const calendar = require('../../assets/icons/^calendar.svg');
    const bed = require('../../assets/icons/^bed.svg');
    const navArrow = require('../../assets/icons/^navArrow.svg');
    const suitcase = require('../../assets/icons/^suitcase.svg');
    const phone = require('../../assets/icons/^phone.svg');
    const cloud = require('../../assets/icons/^cloud.svg');
    const food = require('../../assets/icons/^food.svg');
    const car = require('../../assets/icons/^car.svg');

  	const textStyle = (this.props.scrolledToTop)
  		? { opacity: 1 }
  		: { opacity: 0, transform: 'translateY(80px)' };

  	const downArrow = require('../../assets/icons/^downArrowWhite.svg');
  	const downArrowMove = () => {
  		if (this.props.scrolledToTop) {
  			return { opacity: 1 }
  		}
  		else return { opactiy: 0 }
  	}

		const iconStyle = { width: '64px'};

  	// ––=== PROPORTIONAL WIDTHS ===––
  	const one16 = { width: "6.25vw", display: "inline-table" };
  	const two16 = { width: "12.5vw", display: "inline-table" };
  	const three16 = { width: "18.75vw", display: "inline-table" };
  	const five16 = { width: "31.25vw", display: "inline-table" }; 
  	const six16 = { width: "37.5vw", display: "inline-table" };
  	const seven16 = { width: "43.75vw", display: "inline-table" };
  	const ten16 = { width: "62.5vw", display: "inline-table" };
  	const twelve16 = { width: "75vw", display: "inline-table" };
  	const fourteen16 = { width: "87.5vw", display: "inline-table" };

  	const one12 = { width: "8.333vw", display: "inline-table" };
  	const ten12 = { width: "83.333vw", display: "inline-table" };

  	const eleven32 = { width: "34.375vw", display: "inline-table" };


  	// ––=== FONT SIZES ===––
		const px96 = { fontSize: "96px" };
  	const px84 = { fontSize: "84px" };
  	const px72 = { fontSize: "72px" };
  	const px56 = { fontSize: "56px" };
    const px48 = { fontSize: "48px" };
  	const px32 = { fontSize: "32px" }; 
  	const px24 = { fontSize: "24px" }; 


  	const adventureText = () => {
  		if (this.props.scrolledToTop) {
  			if (this.props.screenSize === "mobile") return { opacity: 1, fontSize: "56px", paddingLeft: "100px" }
				if (this.props.screenSize === "tablet") return { opacity: 1, fontSize: "96px", paddingLeft: "140px" }
				else return { opacity: 1, fontSize: "108px",paddingLeft: "200px" }
  		}
  		else if (this.props.screenSize === "mobile") return { opacity: 0, fontSize: "56px" }
  		else return { opacity: 0, fontSize: "96px" }
		}

  	const gutter = () => {
  		if (this.props.screenSize === "mobile") return one16
  		else if (this.props.screenSize === "tablet") return one12
  		else return two16
  	}
  	const mainBody = () => {
  		if (this.props.screenSize === "mobile") return fourteen16
  		else if (this.props.screenSize === "tablet") return ten12
  		else return twelve16
  	}

  	const header = () => {
  		if (this.props.screenSize === "mobile") return px56
  		else if (this.props.screenSize === "mobile") return px72
  		else return px84;
  	}

  	const bajoHeader = () => {
  		if (this.props.screenSize === "mobile") return px56
  		else if (this.props.screenSize === "tablet") return px72
  		else return px84;
  	}

    const firstBajoHeader = () => {
      if (this.props.screenSize === "mobile") return px48
      else if (this.props.screenSize === "tablet") return px56
      else return px72;
    }

  	const smallText = () => {
  		if (this.props.screenSize === "mobile") return px24
  		else if (this.props.screenSize === "tablet") return px24
  		else return px32;
  	}

  	const categories = () => {
  		return ({ margin: "0px", width: "18.75vw", display: "inline-table" });
  	}

  	const imageBox = () => {
  		if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image1lite})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "54% 44%",
        // backgroundSize: "cover"
      }
      else return { 
        backgroundImage: `url(${Image1lite})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover" 
      }
  	}
  	const imageBox2 = () => {
  		if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image2lite})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "32%",
        backgroundSize: "auto 100vh"
      }
      else return { 
        backgroundImage: `url(${Image2})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "30%",
        backgroundSize: "cover"
      }
  	}
  	const imageBox3 = () => {
  		if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image3})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "90%",
        backgroundSize: "auto 100vh" 
      }
      else return { 
        backgroundImage: `url(${Image3})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "50%",
        backgroundSize: "contain" 
      }
  	}
  	const imageBox4 = () => {
  		if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image4})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "97%",
        backgroundSize: "auto 100vh" 
      }
      else return { 
        backgroundImage: `url(${Image4})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "50%",
        backgroundSize: "contain" 
      }
  	}
    const imageBox5 = () => {
      if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image5})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "86%",
        backgroundSize: "auto 100vh" 
      }
      else return { 
        backgroundImage: `url(${Image5})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover" 
      }
    }
    const imageBox6 = () => {
      if (this.props.screenSize !== "computer") return { 
        backgroundImage: `url(${Image6})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "50%",
        backgroundSize: "auto 100vh" 
      }
      else return { 
        backgroundImage: `url(${Image6})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "50%",
        backgroundSize: "contain" 
      }
    }

    return (
        <div className="main">

        	<div className="imageBox" style={imageBox()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"
	        		style={adventureText()} 
	        	>go on an adventure...</div>
        	</div>

        	<Grid.Row className="bigRow">
        		<Grid.Column style={gutter()}/>
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className="downArrowRow">
        				<div style={eleven32} />
        				<img className="material-icons mIcons downArrow" src={downArrow} style={downArrowMove()}/>
        			</Grid.Row>
        			<Grid.Row className='header gettingMarriedText' style={header()}>We're getting married!</Grid.Row>
        			<Grid.Row className='bajoHeader bajoHeaderFont' style={firstBajoHeader()}>and we would love for you to be there!</Grid.Row>
        			<Grid.Row className='smallText' style={smallText()}>
        				The festivities will take place on the weekend of the 21st of September, 2019 
        				at the Orngard farm in central Iowa.
        			</Grid.Row>
        		</Grid.Column>	
						<Grid.Column style={three16}/>
        	</Grid.Row>

        	<div className="imageBox2" style={imageBox2()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<Grid.Row className="bigRow2">
        		<Grid.Column style={gutter()} />
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className='header' style={header()}>Schedule<img className="material-icons mIcons" src={calendar} style={iconStyle}/></Grid.Row>
        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>Friday:</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>We'll have a potluck dinner, and dancing and merrymaking through the evening.</Grid.Column>
        			</Grid.Row>

        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>Saturday:</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>9:00 am – coffee and a light breakfast.  11:00 am – the ceremony.  Lunch provided afterward. Afternoon will be filled with games and activites and music. Dinner will occur at about 6:30 pm, after which there will be music and dancing for the rest of the night.</Grid.Column>
        			</Grid.Row>

        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>Sunday:</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>We'll have a brunch at about 10:00 am, and dancing and merrymaking through the evening.</Grid.Column>
        			</Grid.Row>

        		</Grid.Column>	
						<Grid.Column style={categories()}/>
        	</Grid.Row>

        	<div className="imageBox3" style={imageBox3()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<Grid.Row className="bigRow3">
        		<Grid.Column style={gutter()} />
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className='header' style={header()}>where to stay<img className="material-icons mIcons" src={bed} style={iconStyle}/></Grid.Row>
        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>hotels:</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>There are couple hotels in Boone, a 20-minute drive away.  There are many (and nicer) hotels in Ames, 35 minutes away (southeast).</Grid.Column>
        			</Grid.Row>
        				
        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>camping:</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>Everyone is welcome to camp on site for ease, safety, and fun.  
        					There's loads of space in the field(s) to spread out, and we'll have portable toilets 
        					and probably a RAGBRAI-style shower.  If you are coming from a distance and can't bring / 
        					don't have camping gear but would like to camp, please do let us know and we'll give you a link 
                  a camping gear rental place that will ship whatever you need to rent to the farm. </Grid.Column>
        			</Grid.Row>

        		</Grid.Column>	
						<Grid.Column style={categories()}/>
        	</Grid.Row>

        	<div className="imageBox4" style={imageBox4()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<Grid.Row className="bigRow4">
        		<Grid.Column style={gutter()} />
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className='header' style={header()}>what to bring<img className="material-icons mIcons" src={suitcase} style={iconStyle}/></Grid.Row>
        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}>clothing</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}><img className="material-icons mIcons" src={cloud} style={iconStyle}/>The festivities will be primarily outdoors, barring heavier precipitation.
        				It's the Midwest, so the weather could do anything...
        				The daily high could be 90º, it could be 50º;  
        				overnight low could be 75º, it could be 40º.
        				It could, of course, rain (last September was unseasonably rainy;  
        				the farmer's almanac projects this coming September to be drier than average... here's hoping!)
        				Bring multiple layers, hats/sunscreen, and eucalyptus oil to repel any bugs and you should be more than fine.
        				Also: just go ahead and bring good weather when you come ;)</Grid.Column>
        			</Grid.Row>

        			<Grid.Row className='bajoHeader' style={bajoHeader()}>
        				<Grid.Column className='bajoHeaderFont' style={categories()}><img className="material-icons mIcons" src={food} style={iconStyle}/>food</Grid.Column>
        				<Grid.Column className='smallText' style={smallText()}>If you're coming Friday and are conveniently
        					able to, you're welcome to bring something for the potluck that evening. 
        					(No worries if you're not able.)
        				</Grid.Column>
        			</Grid.Row>


        		</Grid.Column>	
						<Grid.Column style={categories()}/>
        	</Grid.Row>

        	<div className="imageBox5" style={imageBox5()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<Grid.Row className="bigRow5">
        		<Grid.Column style={gutter()} />
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className='header' style={header()}>address & how to get there</Grid.Row>
        			<Grid.Row className='bajoHeader' style={bajoHeader()}></Grid.Row>
        			<Grid.Row className='smallText' style={smallText()}>
        				<img className="material-icons mIcons" src={car} style={iconStyle}/>coming soon ...
        			</Grid.Row>
        		</Grid.Column>	
						<Grid.Column style={categories()}/>
        	</Grid.Row>

        	<div className="imageBox6" style={imageBox6()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<Grid.Row className="bigRow6">
        		<Grid.Column style={gutter()} />
        		<Grid.Column style={mainBody()}>
        			<Grid.Row className='header' style={header()}>Contact info</Grid.Row>
        			<Grid.Row className='bajoHeader' style={bajoHeader()}></Grid.Row>
        			<Grid.Row className='smallText' style={smallText()}>
        				<img className="material-icons mIcons" src={phone} style={iconStyle}/>coming soon ...
        			</Grid.Row>
        		</Grid.Column>	
						<Grid.Column style={categories()}/>
        	</Grid.Row>

        </div>

    );
  }
}

Main.propTypes = {
  // field3: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	scrolledToTop: PropTypes.bool,
	screenSize: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		scrolledToTop: state.scrolledToTop,
		screenSize: state.screenSize,
    loggedIn: state.loggedIn,
	}
}

export default connect(mapStateToProps)(Main);
