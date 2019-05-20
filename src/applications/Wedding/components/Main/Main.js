/* eslint-disable */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../Wedding.css";
import { updateStore } from "../../utils/action.js";

import Image1 from '../../assets/adventure.jpg';
import Image1lite from '../../assets/adventureLite.jpg';
import Image2 from '../../assets/theMoment.jpg';
import Image2lite from '../../assets/theMomentLite.jpg';
import Image3 from '../../assets/background4.jpg';
import Image4 from '../../assets/background3.jpg';
import Image5 from '../../assets/background5.jpg';
import Image6 from '../../assets/background6.jpg';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.whereAndWhenRef = React.createRef();
    this.scheduleRef = React.createRef();
    this.whereToStayRef = React.createRef();
    this.whatToBringRef = React.createRef();
    this.faqsRef = React.createRef();
    this.howToGetThereRef = React.createRef();
    this.contactUsRef = React.createRef();
  }

	componentDidMount() {
    // DOM elements must have fully loaded for refs to have 
    // accurate "offsetTop" properties; the hereupon is essentially 
    // a backup in case more certainly accurate values for 
    // element locations are not set / not set in time 
    // when the drawer is opened as indicated below.
    setTimeout(() => this.updateDivTops(), 3000);

    // Pass the updateDivTops function to the store so it 
    // can be called when the navigation drawer is open, 
    // ensuring that the links navigate to the correct scroll locations:
    updateStore({ updateDivTops: this.updateDivTops })(this.props.dispatch);
  }

  updateDivTops = () => {
    updateStore({ divTops: this.getDivTops() })(this.props.dispatch);
  }

  getDivTops = () => {
    let refs = {
      whereAndWhen: this.whereAndWhenRef.current.offsetTop,  
      schedule: this.scheduleRef.current.offsetTop,
      whereToStay: this.whereToStayRef.current.offsetTop,
      whatToBring: this.whatToBringRef.current.offsetTop,
      faqs: this.faqsRef.current.offsetTop,
      howToGetThere: this.howToGetThereRef.current.offsetTop,
      conactUs: this.contactUsRef.current.offsetTop,
    }
    return refs;
  }

  goToLogin = () => {
    console.log("goToLogin in MAIN firing...");
    updateStore({ dropOpen: false, loginOpen: true })(this.props.dispatch);
  }

  copyToClipboard = (text) => {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      console.log('nav permissions: ', result.state);
    });

    navigator.clipboard.writeText(text).then(function() {
      console.log('successfully copied', text);
    }, function() {
      console.log('NOT copied', text);
    });
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
    const airplane = require('../../assets/icons/^airplane.svg');
    const directions = require('../../assets/icons/^directions_white.png');

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

		const iconStyle = { width: '64px', margin: '0 10px' };
    const smallIconStyle = (this.props.screenSize === 'mobile')
      ? { width: '30px', margin: '0 10px' }
      : { width: '40px', margin: '0 16px' };

  	// ––=== PROPORTIONAL WIDTHS ===––
  	const one16 = { width: "6.25vw", display: "inline-table" };
  	const two16 = { width: "12.5vw", display: "inline-table" };
  	const three16 = { width: "18.75vw", display: "inline-table" };
    const four16 = { width: "25vw", display: "inline-table" };
  	const five16 = { width: "31.25vw", display: "inline-table" }; 
  	const six16 = { width: "37.5vw", display: "inline-table" };
  	const seven16 = { width: "43.75vw", display: "inline-table" };
    const eight16 = { width: "50vw", display: "inline-table" };
    const nine16 = { width: "56.25vw", display: "inline-table" }; 
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
    const px64 = { fontSize: "64px" };
  	const px56 = { fontSize: "56px" };
    const px48 = { fontSize: "48px" };
  	const px32 = { fontSize: "32px" }; 
  	const px28 = { fontSize: "28px" }; 
    const px24 = { fontSize: "24px" }; 
    const px16 = { fontSize: "16px" }; 


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
  		if (this.props.screenSize === "mobile") return px48
  		else if (this.props.screenSize === "mobile") return px72
  		else return px84;
  	}

  	const bajoHeader = () => {
  		if (this.props.screenSize === "mobile") return px56.fontSize
  		else if (this.props.screenSize === "tablet") return px72.fontSize
  		else return px84.fontSize;
  	}

    const firstBajoHeader = () => {
      if (this.props.screenSize === "mobile") return px48
      else if (this.props.screenSize === "tablet") return px56
      else return px72;
    }

  	const smallText = (this.props.screenSize === "mobile") 
      ? px16
  		: px28;
    const gettingMarried = (this.props.screenSize === "mobile")
      ? { fontSize: "64px", }
      : { fontSize: "136px", };
    const dayOfTheWeek = (this.props.screenSize === "mobile")
      ? { fontSize: "32px", }
      : { fontSize: "64px", };
    const september = (this.props.screenSize === "mobile")
      ? { fontSize: "42px", margin: "0 10px", }
      : { fontSize: "64px", margin: "0 12px", };
    const orngard = (this.props.screenSize === "mobile")
      ? { fontSize: "28px", margin: "0", }
      : { fontSize: "32px", margin: "0", };
    const booneCounty = (this.props.screenSize === "mobile")
      ? { fontSize: "38px", margin: "0", }
      : { fontSize: "48px", margin: "0", };
    const headerIcon = { margin: "0 18px", };
    const timeBox = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "0", display: "inline-flex", width: four16.width, fontWeight: 700, height: "100%", }
      : { fontSize: "28px", margin: "0", display: "inline-flex", width: two16.width, fontWeight: 700, height: "100%", };
    const eventBox = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "0", display: "inline-flex", width: nine16.width, }
      : { fontSize: "28px", margin: "0", display: "inline-flex", width: eight16.width, };
    const gridBoxLeft = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "0 auto", display: "block", width: "100%", textAlign: "center", }
      : { fontSize: "28px", margin: "0", display: "inline-flex", width: three16.width, };
    const gridBoxRight = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "0 auto", display: "block", width: "100%", textAlign: "center", }
      : { fontSize: "28px", margin: "0", display: "inline-flex", width: eight16.width, };
    const xMargin = (this.props.screenSize === "mobile")
      ? { fontSize: "16px", margin: "0 auto", display: "block", width: "100%", textAlign: "center", }
      : { margin: "0 16px", display: "inline-flex", };
    const responsiveHorizSpacer = (this.props.screenSize === 'mobile')
      ? { width:  "100%", height: "1px", marginBottom: "24px", }
      : { width:  "100%", height: "1px", marginBottom: "60px",  };

  	const categoryHeader = () => {
  		return ({ margin: "0px", width: "100%", display: "inline-table", fontSize: bajoHeader() });
  	}
    const smallCategoryHeader = (this.props.screenSize === 'mobile')
      ? { fontSize: "24px", fontWeight: 700, }
      : { fontSize: "40px", fontWeight: 700, };
    const loginButtonStyle = (this.props.screenSize === 'mobile')
      ? { background: "#438466", color: "white", border: "solid gray 1px", borderRadius: "4px", margin: "4px 12px", padding: "10px 16px", display: "inline-table", }
      : { background: "#438466", color: "white", border: "solid gray 1px", borderRadius: "4px", margin: "4px 12px", padding: "10px 16px", display: "inline-table", };
    const paddingLeftWrapper = (this.props.screenSize === 'mobile')
      ? { paddingLeft: two16.width }
      : { paddingLeft: one16.width };
    const paddingLeftWrapperNotOnMobile = (this.props.screenSize === 'mobile')
      ? { paddingLeft: "0" }
      : { paddingLeft: one16.width };
    const hideOnMobile = (this.props.screenSize === 'mobile')
      ? { display: "none" }
      : { visibility: "visible" };
    const onlyOnMobile = (this.props.screenSize === 'mobile')
      ? { visibility: "visible" }
      : { display: "none" }; 
    const breakOnMobile = (this.props.screenSize === 'mobile')
      ? { display: "block" }
      : { visibility: "visible" };
    const mediumSmallText = (this.props.screenSize === 'mobile')
      ? { fontSize: "20px" }
      : { fontSize: "28px" };
    const inlineTable = { display: "inline-table", width: "100%", };
    const footer = (this.props.screenSize === 'mobile')
      ? { fontSize: "14px" }
      : { fontSize: "20px" };
    const notFancyOnMobile = (this.props.screenSize === 'mobile')
      ? { margin: "0px", width: "100%", display: "inline-table", fontWeight: 700, fontSize: "20px", fontFamily: "Montserrat" }
      : { margin: "0px", width: "100%", display: "inline-table", fontSize: bajoHeader(), fontFamily: "Sacramento" }



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

        	<div className="bigRow">
        		<div style={gutter()}/>
        		<div style={mainBody()}>
        			<div className="downArrowRow">
        				<div style={eleven32} />
        				<img className="material-icons mIcons downArrow" src={downArrow} style={downArrowMove()}/>
        			</div>
        			<div className='gettingMarriedText' style={gettingMarried} ref={this.whereAndWhenRef}>
                We're Getting Married!
              </div>
        			<div className='smallText1' style={smallText}>
                <div className="alignTextCenter fatMarginBottom joinUs alignCenter">
          				We sincerely hope you can join us for a weekend of 
                  love, food, dancing, and merrymaking. 
                </div>
        			</div>
              <div className='smallText1' style={smallText}>
                <div className="alignTextCenter fatMarginBottom">Friday, 
                  <span className="sacramento" style={september}>September</span> 
                  <span className="roboto" style={dayOfTheWeek}>20</span> - Sunday, 
                  <span className="sacramento" style={september}>September</span> 
                  <span className="roboto" style={dayOfTheWeek}>22</span>
                </div>
              </div>
              <div className='smallText1' style={smallText}>
                <div className="alignTextCenter">
                  the <span style={orngard}>Orngard</span> farm
                </div>
                <div className="alignTextCenter fatMarginBottom">
                  <span className="sacramento" style={booneCounty}>Boone County</span>, Iowa
                </div>
              </div>              
        		</div>	
						<div style={three16}/>
        	</div>

        	<div className="imageBox2" style={imageBox2()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<div className="bigRow2" ref={this.scheduleRef}>
        		<div style={gutter()} />
        		<div style={mainBody()}>
        			<div className='header fatMarginBottom' style={header()}>schedule<span style={headerIcon}><img className="material-icons mIcons" src={calendar} style={iconStyle}/></span></div>
        			<div className='bajoHeader'>
        				<div className='bajoHeaderFont' style={categoryHeader()}>Friday:</div>
        				<div className='smallText2' style={smallText}>
                  <div style={timeBox}><div>5:30pm</div></div>
                  <div style={eventBox}>Welcome Potluck Dinner - All are invited to attend</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}><div>7:00pm</div></div>
                  <div style={eventBox}>Contradancing, bonfires</div>
                </div>
                <div className='thinMarginBottom' />
        			</div>

        			<div className='bajoHeader'>
        				<div className='bajoHeaderFont' style={categoryHeader()}>Saturday:</div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>11:00am</div>
                  <div style={eventBox}>Ceremony</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>12:00pm</div>
                  <div style={eventBox}>Meal</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>1:30pm</div>
                  <div style={eventBox}>Lawn games, hiking, live music, & other activities</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>4:30pm</div>
                  <div style={eventBox}>Cocktail hour</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>5:30pm</div>
                  <div style={eventBox}>Dinner</div>
                </div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>7:00pm</div>
                  <div style={eventBox}>Dancing, bonfires, & evening fun</div>
                </div>
                <div className='thinMarginBottom' />
        			</div>

        			<div className='bajoHeader'>
        				<div className='bajoHeaderFont' style={categoryHeader()}>Sunday:</div>
                <div className='smallText2' style={smallText}>
                  <div style={timeBox}>10:30am</div>
                  <div style={eventBox}>Brunch</div>
                </div>
                <div className='fatMarginBottom' />
                <div className='fatMarginBottom' />
        			</div>

        		</div>	
						<div style={categoryHeader()}/>
        	</div>

        	<div className="imageBox3" style={imageBox3()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<div className="bigRow3" ref={this.whereToStayRef}>
        		<div style={gutter()} />
        		<div style={mainBody()}>
        			<div className='header' 
              onClick={this.getDivTops}
              style={header()}>where to stay<img className="material-icons mIcons" src={bed} style={iconStyle}/></div>
        			
              <div className='bajoHeader'>
                <div className='bajoHeaderFont' style={categoryHeader()}>camping:</div>
                <div className='smallText thinMarginBottom' style={smallText}>Everyone is welcome to camp 
                  on the Orngard farm for ease, safety, and fun!   Some of our favorite moments 
                  together have been while camping under the stars, and we can’t wait to create 
                  some more happy camping memories with anyone who is game. 
                </div>
                <div className='smallText fatMarginBottom' style={smallText}>
                  There will be a large field at the farm reserved for those who are camping.  
                  Portable toilets and Ragbrai-style showers will be available.    
                </div>
              </div>
              <div className='smallText skinnyMarginBottom' style={smallCategoryHeader}>
                camping {(this.props.screenSize === 'mobile') ? 'gear' : 'equipment'} rental
              </div>
              <div className='smallText thinMarginBottom' style={smallText}>
                If you are coming from a long distance, or don’t already have gear, 
                we are partnering with <a className='bold linkAway' target='_blank' href='https://www.lowergear.com/'>Lower Gear Rentals</a> located in Arizona for camping rentals.  
                A basic 2-person package including a tent, sleeping bags, mattress pads, and 
                shipping cost will run close to $85 per person for the whole weekend. They will ship 
                directly to the farm and we’ll have it waiting for you!  We will also take care of 
                returning the gear (dropping it off at the post office) after the weekend for you 
                as well.  
              </div>
              <div className='smallText thinMarginBottom' style={smallText}>
                When booking, be sure to include a <span className='bold'>delivery date</span> of either <span className='bold'>Thursday, 
                September 19</span> OR <span className='bold'>Friday, September 20</span> and the following shipping address: <span className='block thinMarginBottom'/> 
                <div style={paddingLeftWrapper}>
                  {(this.props.loggedIn === true) 
                    ? (<div><div className='block'>924 118th Street</div> 
                       <div className='block' >Pilot Mound, IA 50223</div></div>)
                    : (<div className='loginButton' style={loginButtonStyle} onClick={this.goToLogin}>log in to see address</div>)}
                </div>
              </div>
              <div className='smallText thinMarginBottom' style={smallText}>
                If you have questions please contact the store owner Dallas at 
                <div className='bold emailAddress' onClick={() => this.copyToClipboard('dallas@lowergearrentals.com')}>
                dallas@lowergearrentals.com</div>
                Be sure to book <span className='bold'>by September 1, 2019</span>.  Note: You can reserve your 
                package anytime with zero cancellation fee - your card will not be 
                charged until shipping occurs. 
              </div>

              <div className='fatHorizSpacer'/>

              <div className='bajoHeader'>
        				<div className='bajoHeaderFont' style={categoryHeader()}>hotels:</div>
                <div className='smallText thinMarginBottom' style={smallText}>
                  If camping isn’t your style, no worries!  We’ve booked two blocks of hotel rooms: 
                </div>

                <div className='smallText block skinnyMarginBottom' style={smallCategoryHeader}>
                  <a className='bold linkAwayHeader noDec' target='_blank' href='https://www.wyndhamhotels.com/baymont/boone-iowa/baymont-inn-suites-boone/overview?CID=LC:BU::GGL:RIO:National:70199&iata=00065402'>
                  Baymont Inn </a><span className='normalWeight'>
                  <span style={hideOnMobile}>located in </span>Boone <span className='block'/>
                  <span className='mediumGray' style={mediumSmallText}>
                  <img className="material-icons mIcons smallMarginRight" src={car} style={smallIconStyle}/>
                  23 minutes <span style={hideOnMobile}>away </span>from the farm</span></span>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <div className='bold linkAwayHeader' onClick={() => this.copyToClipboard('1745 SE Marshall St, Boone, IA')}>
                    1745 SE Marshall St, Boone, IA
                  </div>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  Book before: July 20, 2019
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  Room rate: <span style={breakOnMobile}/>2 double beds: 
                  $121, <span style={breakOnMobile}/>King Bed: 
                  $126, <span style={breakOnMobile}/>Suite: $149
                </div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  Call <span style={mediumSmallText}>(515)432-8168</span>
                </div>

                <div className='smallText block bold skinnyMarginBottom' style={smallCategoryHeader}>
                  <a className='bold linkAwayHeader noDec' target='_blank' href='https://www.radisson.com/ames-hotel-ia-50010/usaamia?s_cid=os.amer-us-rad-usaamia-gmb'>
                  Radisson Hotel </a><span className='normalWeight'>
                  <span style={hideOnMobile}>located in </span>Ames <span className='block'/>
                  <span className='mediumGray' style={mediumSmallText}>
                  <img className="material-icons mIcons smallMarginRight" src={car} style={smallIconStyle}/>
                  35 minutes <span style={hideOnMobile}>away </span>from the farm</span></span>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <div className='bold linkAwayHeader' onClick={() => this.copyToClipboard('2609 University Blvd, Ames, IA')}>
                    2609 University Blvd, Ames, IA
                  </div>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  Book before: August 29, 2019
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  Room rate: <span style={breakOnMobile}/>$129 on Thursday, 
                  9/19, <span style={breakOnMobile}/>$155 on Friday, 
                  9/20, <span style={breakOnMobile}/>$155 on Saturday, 9/21
                </div>
                <div className='smallText block thinMarginBottom' style={smallText}>
                  Call <span style={mediumSmallText}>(515)268-8808</span> to reserve under Wittig/Orngard Wedding Block 
                  (must book two nights in order to receive group rate…)
                </div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  FYI:  there is an ISU home football game this weekend 
                  (unfortunately!), meaning nearby hotels (particularly in Ames) 
                  will be more expensive than usual and are likely to fill sooner 
                  than later, so our blocks may actually be cheaper than other 
                  hotels in the area, but by all means, feel free to do your own research. 
                </div>

                <div className='block fatMarginBottom'/>
        			</div>


        		</div>	
						<div style={categoryHeader()}/>
        	</div>

        	<div className="imageBox4" style={imageBox4()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<div className="bigRow4" ref={this.whatToBringRef}>
        		<div style={gutter()} />
        		<div style={mainBody()}>
        			<div className='header' style={header()}>what to bring<img className="material-icons mIcons" src={suitcase} style={iconStyle}/></div>
        			<div className='bajoHeader'>
                <div className='bajoHeaderFont' style={categoryHeader()}>If you're...</div>
                <div style={notFancyOnMobile}>camping:</div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • a headlamp 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • a lantern 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • camping chairs 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • ear plugs <span className='italic'>(if you’re a light sleeper)</span> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • a pillow <span className='italic'>(we love <a className='linkAway' target='_blank' href='https://www.amazon.com/Trekology-Ultralight-Inflating-Camping-Pillows/dp/B072M4M4VT/ref=sr_1_3?crid=1M8E5RGWMMHLX&keywords=inflatable+pillow+camping&qid=1555292011&s=gateway&sprefix=inflatable+pillow+%2Caps%2C202&sr=8-3'
                    >this one</a>)</span>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}> 
                  • face wipes 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • layers and changes of clothes for the weekend. Check the weather the week before! 
                </div>
                <div className='smallText' style={smallText}>
                  <span className='italic'>Weather-dependent items: </span><span className='block'/>footprint tarp, plastic bins/bags for your stuff, and rain gear 
                </div>

                <div className='fatHorizSpacer'/>
                <div style={notFancyOnMobile}>just coming for the day:</div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • Layers - you never know what the weather in the Midwest will do!
                </div> 
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • Eucalyptus oil for natural, DEET-free <a className='linkAway' target='_blank' href='https://www.amazon.com/dp/B01INIXAHA/ref=psdc_3737951_t3_B004N59OFU'>bug repellent</a>
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • Sunscreen/Sunglasses/Hat
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • Comfortable shoes - Heels will most likely sink you into the grass, be aware of your shoe choices! You’ll be walking on gravel, grass and there’s potential for hikes throughout the farm. 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>                  
                  • Lawn chairs (if you'll be more comfortable in those than in folding chairs), blankets for laying out, hammocks for hanging out and relaxing in the afternoon
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  • A change of clothes <span className='italic'>(optional)</span>; feel free to change into comfortable clothing for afternoon games/relaxing (changing rooms will be available)
                </div>
              </div>

              <div className='fatHorizSpacer' ref={this.faqsRef}/>
              <div className='smallText bold purplish' style={header()}>FAQs<img className="material-icons mIcons" src={suitcase} style={iconStyle}/></div>
              <div className='bajoHeader'>
                <div className='smallText bold' style={smallCategoryHeader}>What should I wear?</div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  Dress for the weather and for your comfort! Feel free to change 
                  throughout the day.  We’d strongly advise women against wearing heels,  
                  just because you’ll sink into the ground. :) If you’re 
                  hanging out in the evenings with us, prepare for your clothes to 
                  smell like campfire!
                </div>
                <div className='smallText bold' style={smallCategoryHeader}>What will the weather be like?
                  <img className="material-icons mIcons" src={cloud} style={iconStyle}/>
                </div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  The festivities will be primarily outdoors, barring heavier precipitation.
          				It's the Midwest, so the weather could do anything...
          				The daily high could be 90º, it could be 50º;  
          				overnight low could be 75º, it could be 40º.
          				It could, of course, rain (last September was unseasonably rainy;  
          				the farmer's almanac projects this coming September to be drier than average... here's hoping!)
                  So be just ready for heat, cold, rain, sun, and bugs and you'll be sure to be fine.
          				Also: just go ahead and bring good weather when you come ;)
                </div>
                <div className='smallText bold' style={smallCategoryHeader}>
                  What's going on in the afternoon?
                </div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  We chose to get married in the morning and have an all-day (and weekend)
                  celebration so that we could spend as much time as possible with 
                  all of you! That being said, please do what is best for you in the 
                  afternoon.  There will be plenty of activities, games, music, and 
                  options for walks or hikes on the farm during that time.  Don’t feel 
                  like you need to catch all of it;  feel free to rest, take naps, relax, 
                  spread out, or if you want to escape, go for a drive along the Des Moines 
                  River, explore small town Iowa, etc.  We want you to have fun of course, but 
                  also want you to take care of yourself and do what is best for you! 
                </div>

                <div className='smallText bold skinnyMarginBottom' style={smallCategoryHeader}>
                  Are there any fun things to do in the area?
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.iowadnr.gov/Places-to-Go/State-Parks/Iowa-State-Parks/ParkDetails/ParkID/610148'>
                    Ledges State Park
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://bsvrr.com/wp/'>
                    Boone & Scenic Valley Railroad
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.traveliowa.com/trails/high-trestle-trail/28/'>
                    High Trestle Bike Trail
                  </a> 
                </div>
                <div className='smallText block fatMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.iowadnr.gov/Places-to-Go/State-Parks/Iowa-State-Parks/ParkDetails/ParkID/610107'>
                    Dolliver State Park
                  </a> 
                </div>

                <div className='bold smallText skinnyMarginBottom' style={mediumSmallText}>
                  Nearby places for food, coffee, wine, and beer:
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Provisions+Lot+F/@42.0006777,-93.6379568,16z/data=!4m8!1m2!3m1!2sProvisions+Lot+F!3m4!1s0x87ee7a4274884ccd:0x16748809eac337f7!8m2!3d42.0007278!4d-93.6355627'>
                    Provisions
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/The+Cafe/@42.0487255,-93.6458522,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee70c2eeb686bb:0x7b7d9600cdf75960!8m2!3d42.0487215!4d-93.6436635'>
                    the Café
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/India+Palace/@42.0219132,-93.6536491,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee70a7db3c8511:0x1ba56ae81d88bea!8m2!3d42.0219092!4d-93.6514604'>
                    India Palace
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Indian+Delights/@42.0218801,-93.6739096,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee77579c8a8b3b:0x9f0c736c9871fe8b!8m2!3d42.0218761!4d-93.6717209'>
                    Indian Delights
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Cafe+Beaudelaire/@42.0225186,-93.652676,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee70a7b253cccd:0x2b92310127cf2502!8m2!3d42.0225146!4d-93.6504873'>
                    Café Beaudelaire
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Bar+La+Tosca/@42.0248252,-93.6177273,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee70793e72490f:0xa2071c00ba7a3879!8m2!3d42.0248212!4d-93.6155386'>
                    Bar La Tosca
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Stomping+Grounds+Cafe/@42.02015,-93.6527504,17z/data=!3m1!4b1!4m5!3m4!1s0x87ee7a0826b61ec5:0x5940ed366cdfcff6!8m2!3d42.020146!4d-93.6505617'>
                    Stomping Grounds <span className='italic'>(coffee shop + food)</span>
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Prairie+Moon+Winery/@42.0781995,-93.6706547,16.94z/data=!4m5!3m4!1s0x87ee76c8353d3325:0x5f80cf77ecc6bab5!8m2!3d42.078118!4d-93.670624'>
                    Prairie Moon Winery / </a><a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Alluvial+Brewing+Company/@42.0787225,-93.670129,16.94z/data=!4m12!1m6!3m5!1s0x87ee76c8353d3325:0x5f80cf77ecc6bab5!2sPrairie+Moon+Winery!8m2!3d42.078118!4d-93.670624!3m4!1s0x0:0x4867ec0dcb1ff6b3!8m2!3d42.0797398!4d-93.66662'>
                    Alluvial Brewing Co.
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href='https://www.google.com/maps/place/Boone+Valley+Brewing+Co/@42.062589,-93.8828623,17z/data=!3m1!4b1!4m5!3m4!1s0x87eddb10acee2973:0xe1f3875b671386b0!8m2!3d42.062585!4d-93.8806736'>
                    Boone Valley Brewing Co.
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href="https://www.google.com/maps/place/The+Livery+Deli/@42.0627105,-93.8812074,17z/data=!4m8!1m2!3m1!2sThe+Livery+Deli!3m4!1s0x87eddb1756cfaacd:0x6f18cb50cb788a6a!8m2!3d42.0625955!4d-93.8812034">
                    the Livery Deli
                  </a> 
                </div>
                <div className='smallText block skinnyMarginBottom' style={smallText}>
                  <a className='bold linkAway noDec' target='_blank' href="https://www.google.com/maps/place/Van+Hemert's+Dutch+Oven+Bakery+-+Boone,+IA/@42.0627105,-93.8812074,17z/data=!4m8!1m2!3m1!2sVan+Hemert's+Dutch+Oven+Bakery+-+Boone,+IA!3m4!1s0x87eddb1a0fadbb81:0xfeb4477bb53e252!8m2!3d42.0620558!4d-93.8802103">
                    Dutch Oven Bakery
                  </a> 
                </div>

                <div className='fatHorizSpacer'/>

                <div className='smallText italic' style={smallCategoryHeader}>
                  If you want to pick up snacks/food to bring out to the farm:
                </div>
                <div className='smallText block' style={smallText}>
                  • Wheatsfield Co-op
                </div>
                <div className='smallText block' style={smallText}>
                  • Aldi
                </div>
                <div className='smallText block' style={smallText}>
                  • Hy-Vee
                </div>
                <div className='smallText block' style={smallText}>
                  • Fresh Thyme Market
                </div>
                <div className='smallText block' style={smallText}>                  
                  • Fareway
                </div>

        			</div>

        			<div className='bajoHeader'>
        				<div className='bajoHeaderFont' style={categoryHeader()}>
                  <img className="material-icons mIcons" src={food} style={iconStyle}/>
                  Potluck
                </div>
        				<div className='smallText' style={smallText}>
                  We hope that many of you will be able to come Friday evening!
                  And if you do, and are conveniently able to, you're welcome to bring 
                  something for the potluck that evening. 
        					(But no worries if you're not able to.)
                  <span className='block'/>Stay tuned for more information!
        				</div>

                <div className='fatHorizSpacer'/>
        			</div>


        		</div>	
						<div style={categoryHeader()}/>
        	</div>

        	<div className="imageBox5" style={imageBox5()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<div className="bigRow5" ref={this.howToGetThereRef}>
        		<div style={gutter()} />
        		<div style={mainBody()}>
        			<div className='header' style={header()}>address & how to get there</div>
        			<div className='bajoHeader'></div>
        			<div className='smallText fatMarginBottom' style={smallText}>
                {(this.props.loggedIn === true)
                  ? (<div>
                      <div className='bajoHeaderFont' style={categoryHeader()}>address</div>
                      <div style={paddingLeftWrapper}>
                        <div className='linkAwayHeader bold noDec' onClick={() => this.copyToClipboard('924 118th St, Pilot Mound, IA 50223')}>
                          <div className='block'>924 118th Street</div> 
                          <div className='block'>Pilot Mound, IA 50223</div>
                        </div>
                      </div>

                      <div className='fatHorizSpacer'/>
                      <div className='bajoHeaderFont' style={categoryHeader()}>
                        driving
                        <img className="material-icons mIcons" src={car} style={iconStyle}/>
                        <div style={responsiveHorizSpacer}/>
                        <div style={paddingLeftWrapperNotOnMobile}>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            <a className='bold mapsButton noDec' target='_blank' href='https://www.google.com/maps/place/924+118th+St,+Pilot+Mound,+IA+50223/@42.1726934,-94.0129144,13z/'>
                              GoogleMaps<img className="material-icons mIcons whiteIcon" src={directions} style={smallIconStyle}/>
                            </a> 
                          </div>

                          <div className='thinHorizSpacer'/>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            The farm is located right along the Des Moines River, 30 miles 
                            northwest of Ames, IA, just off county road E18 20 miles due west from 
                            Interstate 35 exit 123 near Story City.
                          </div>
                        </div>
                      </div>

                      <div className='fatHorizSpacer'/>
                      <div className='bajoHeaderFont' style={categoryHeader()}>
                        flying
                        <img className="material-icons mIcons" src={airplane} style={iconStyle}/>
                        <div style={paddingLeftWrapperNotOnMobile}>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Des Moines (<span className='bold'>DSM</span>) <span style={breakOnMobile}/>is the nearest airport, at just over an hour away.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Omaha (<span className='bold'>OMA</span>)<span style={breakOnMobile}/> is 2.5 hours southwest on I-80.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Minneapolis (<span className='bold'>MSP</span>)<span style={breakOnMobile}/> is about 3.5 hours north on I-35.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Kansas City (<span className='bold'>MCI</span>) <span style={breakOnMobile}/>is about 3.5 hours south on I-35.
                          </div>
                          <div className='smallText block thinMarginBottom' style={smallText}>
                            Chicago O'Hare (<span className='bold'>ORD</span>) <span style={breakOnMobile}/>is about 5.5 hours east on I-80.
                          </div>
                          <div className='smallText block' style={smallText}>
                            I wish I could say "just Uber/Lyft from the airport!"... 
                            but that's pretty unrealistic.  Renting a car
                            will most likely be your best 
                            bet. <span className='bold'>But if you are flying in</span> and 
                            might like to split a rental car,
                            please let us know!  and we'll see if we can link you up with 
                            other kind people coming in to cut down on cost/empty seats and 
                            fossil fuel emissions.  
                          </div>
                        </div>
                      </div>


                    </div>)
                  : (<div>
                      <div className='bajoHeaderFont' style={categoryHeader()}>address</div>
                      <div className='loginButton' style={loginButtonStyle} onClick={this.goToLogin}>
                        log in to get address
                        <img className="material-icons mIcons" src={navArrow} style={smallIconStyle}/>
                      </div>

                      <div className='fatHorizSpacer'/>
                      <div className='bajoHeaderFont' style={categoryHeader()}>
                        driving
                        <img className="material-icons mIcons" src={car} style={iconStyle}/>
                        <div style={responsiveHorizSpacer}/>
                        <div style={paddingLeftWrapperNotOnMobile}>
                          <div className='block skinnyMarginBottom' style={smallText}>
                            <div className='bold mapsButton noDec inlineTable' onClick={this.goToLogin}>
                              GoogleMaps<img className="material-icons mIcons whiteIcon" src={directions} style={smallIconStyle}/>
                            </div> 
                          </div>
                          <div className='fatHorizSpacer'/>
                        </div>
                      </div>

                      <div className='bajoHeaderFont' style={categoryHeader()}>
                        flying
                        <img className="material-icons mIcons" src={airplane} style={iconStyle}/>
                        <div style={paddingLeftWrapperNotOnMobile}>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Des Moines (<span className='bold'>DSM</span>) <span style={breakOnMobile}/>is the nearest airport, at just over an hour away.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Omaha (<span className='bold'>OMA</span>)<span style={breakOnMobile}/> is 2.5 hours southwest on I-80.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Minneapolis (<span className='bold'>MSP</span>)<span style={breakOnMobile}/> is about 3.5 hours north on I-35.
                          </div>
                          <div className='smallText block skinnyMarginBottom' style={smallText}>
                            Kansas City (<span className='bold'>MCI</span>) <span style={breakOnMobile}/>is about 3.5 hours south on I-35.
                          </div>
                          <div className='smallText block thinMarginBottom' style={smallText}>
                            Chicago O'Hare (<span className='bold'>ORD</span>) <span style={breakOnMobile}/>is about 5.5 hours east on I-80.
                          </div>
                          <div className='smallText block' style={smallText}>
                            I wish I could say "just Uber/Lyft from the airport!"... 
                            but that's pretty unrealistic.  Renting a car or carpooling
                            will most likely be your best 
                            bet. <span className='bold'>But if you are flying in</span> and 
                            might like to split a rental car,
                            please let us know!  and we'll see if we can link you up with 
                            other kind people coming in to cut down on cost/empty seats and 
                            fossil fuel emissions.  
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                }
        			</div>
        		</div>	
            <div className='fatHorizSpacer'/>
        	</div>

        	<div className="imageBox6" style={imageBox6()}>
        		<div className="spacerBox" />
	        	<div className="mainTextLarge"/>
        	</div>

        	<div className="bigRow6" ref={this.contactUsRef}>
        		<div style={gutter()} />
        		<div style={mainBody()}>
        			<div className='header' style={header()}>
                contact info
                <img className="material-icons mIcons" src={phone} style={smallIconStyle}/>
              </div>
        			<div className='bajoHeader'></div>
        			<div className='smallText' style={smallText}>
        				
                {(this.props.loggedIn === true)
                  ? (<div style={inlineTable}>
                        <div style={gridBoxLeft}><span className='bajoHeaderFont' style={categoryHeader()}>emily</span></div>
                        <div style={gridBoxRight}>
                          <div className='linkAwayHeader bold' style={xMargin} onClick={() => this.copyToClipboard('wittig.emily@gmail.com')}>
                            wittig.emily@gmail.com
                          </div>
                          <span style={breakOnMobile}/>(319)331-5348
                        </div>
                        <div className='fatHorizSpacer' style={onlyOnMobile}/>
                        <div style={gridBoxLeft}><span className='bajoHeaderFont' style={categoryHeader()}>ehler</span></div>
                        <div style={gridBoxRight}>
                          <div className='linkAwayHeader bold' style={xMargin} onClick={() => this.copyToClipboard('ehlerorngard@gmail.com')}>
                            ehlerorngard@gmail.com
                          </div>
                          <span style={breakOnMobile}>(515)290-5972</span>
                        </div>
                    </div>)
                  : (<div className='loginButton' style={loginButtonStyle} onClick={this.goToLogin}>log in to see contact info</div>)
                }
        			</div>
        		</div>	
            <div className='fatHorizSpacer'/>
            <div className='footer' style={footer}>
              © 2019 ehler orngard
            </div>
        	</div>

        </div>

    );
  }
}

Main.propTypes = {
  // field3: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	scrolledToTop: PropTypes.bool,
	screenSize: PropTypes.string,
  divTops: PropTypes.object,
}

const mapStateToProps = (state) => {
	return {
		scrolledToTop: state.scrolledToTop,
		screenSize: state.screenSize,
    loggedIn: state.loggedIn,
    divTops: state.divTops,
	}
}

export default connect(mapStateToProps)(Main);
