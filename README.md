# <img width="48" alt="" src="https://user-images.githubusercontent.com/34467850/58840135-60550600-8619-11e9-8705-ae0f03a27aad.png">    orngard.com  
Client interface in React + Redux for orngard.com and Wedding Website <br /><br />


# Wedding Website 

This directory of orngard.com is a live wedding website that is displaying information about my upcoming wedding in autumn of 2019 and is – as you read this – taking and storing guests' RSVPs and data via connection to a backend API I built in Python/Django + Postgres. (*check it out:* **[backend](https://github.com/ehlerorngard/WeddingWebsite_backend)**).

## the site in action
![wedding website](https://user-images.githubusercontent.com/34467850/58844807-a0be7f00-862d-11e9-8f47-b31e30c61105.gif)

### [test it out for yourself here!](https://www.orngard.com/ehlerandemily)
_Feel free to try a sample RSVP (select from the menu drawer)._

<br /><br />
## code excerpts 

### requester.js
In order to make cross-origin post, put, and delete requests to the Python API we must acquire a Cross Site Request Forgery (CSRF) token, which will only be issued to whitelisted domains: <br />
<img width="858" alt="getCsrfToken" src="https://user-images.githubusercontent.com/34467850/58841035-06eed600-861d-11e9-9265-d274d3fcefa5.png">
<br />
...update the axios instance for subsequent api calls: <br />
<img width="726" alt="resetAxiosBase" src="https://user-images.githubusercontent.com/34467850/58841070-1e2dc380-861d-11e9-87db-cf2c546d1485.png">

### Login.js
<img width="884" alt="login" src="https://user-images.githubusercontent.com/34467850/58841065-1cfc9680-861d-11e9-9dd6-a1f4555c319e.png">

### actions.js
Upon successful login, get the RSVP from the database: <br />
<img width="626" alt="getRsvp" src="https://user-images.githubusercontent.com/34467850/58903161-90ec7c80-86b9-11e9-8cfc-6c05314114af.png">

...and get all invitees where foreign key rsvp_id is that of the RSVP:<br />
<img width="796" alt="getInvOnRsvp" src="https://user-images.githubusercontent.com/34467850/58841060-1cfc9680-861d-11e9-9589-920bbb14864f.png">

### requester.js
<img width="501" alt="getInvOnRsvp (requester)" src="https://user-images.githubusercontent.com/34467850/58841061-1cfc9680-861d-11e9-8a3d-b3fda678f485.png">

### Rsvp.js
Update the "attending" status of guests on the RSVP:<br />
<img width="726" alt="toggleCheckbox" src="https://user-images.githubusercontent.com/34467850/58841071-1e2dc380-861d-11e9-92e9-b8fd97f7492d.png">  <br />
...which to the user looks like...  <br />
![toggleAttending](https://user-images.githubusercontent.com/34467850/58844308-7a97df80-862b-11e9-8418-04e46fdeae3c.gif)

### Main.js
Get refs' positions to be used in navigation links: <br />
<img width="739" alt="getDivTops" src="https://user-images.githubusercontent.com/34467850/58841059-1c640000-861d-11e9-8021-8519b85adb3d.png">

### Navbar.js
Navigate to the desired content / section using refs' offsetTop property from Main.js: <br />
<img width="591" alt="navigation" src="https://user-images.githubusercontent.com/34467850/58841066-1d952d00-861d-11e9-8f40-81153bc59e6b.png">

![goToSchedule](https://user-images.githubusercontent.com/34467850/58843921-98644500-8629-11e9-92ec-91b2d88f1fcb.gif)


### Rsvp.js
List the people invited for a given RSVP (such that guest names can be converted to editable inputs on click):
<img width="884" alt="list of invitees" src="https://user-images.githubusercontent.com/34467850/58845698-f8121e80-8630-11e9-86b1-8d36edf8d4cf.png">


### Cartographer.js
Data type validation via PropTypes, mapping the redux store to component props, & connecting to the redux store:<br />
<img width="647" alt="proptypes + redux mapping" src="https://user-images.githubusercontent.com/34467850/58841069-1d952d00-861d-11e9-91cf-94bfd214b454.png">


### Main.js
Some responsive styling: <br />
<img width="879" alt="example of some responsive styling" src="https://user-images.githubusercontent.com/34467850/58841058-1c640000-861d-11e9-97d7-674d6bb125ec.png">



## technologies utilized 
* React
* Redux
* Material-UI
* axios
