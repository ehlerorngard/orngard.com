import axios from "axios";


let token = '';

let tokenFailed = false;

// to use this custom base, replace all the axios.whatever calls
// with pyxios.whatever below;  adjust to remove "/api"(?)
const pyxios = axios.create({
  // baseURL: 'https://whateveritscalleddd.herokuapp.com',
  baseURL: 'http://localhost:8000',
  timeout: 1500,
  headers: {'X-CSRFToken': token}
})


// Handle response errors:
function checkStatus(response) {
  console.log("checkStatus REZ: ", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


export default {
  // In order for the Python/Django API to accept requests from a remote location,
  // we must fetch a CSRF token to use in our request headers that it will only 
  // issue to an authorized domain (this is called when React mounts on page load):
  getCsrfToken: () => {
    console.log('getCsrfToken firing.....');
    return axios.get("/csrf/")
      .then(response => {
        token = response.data.csrfToken;
      })
      .then(() => {  
        // Make sure the API is accepting requests with the new CSRF token:
        pyxios.get("/ping/").then(res => {
          if (res.data.result === "OK") return true;
          // If not, try acquiring a new token:
          else axios.get("/csrf/").then(rez => {
            if (rez.data.csrfToken) token = rez.data.csrfToken;
            else return false;
          });
        });
      });
  },

  //=================|
  //===== RSVPs =====|
  //=================|
	getRsvp: (id) => {
    return pyxios.get(`/api/rsvps/${id}/`)
    	.then(checkStatus);
  },
  getRsvps: () => {
    return pyxios.get("/api/rsvps/")
    	.then(checkStatus);
  },
	createRsvp: (data) => {
    return pyxios.post("/api/rsvps/", data)
    	.then(checkStatus);	
	},
  updateRsvp: (id, data) => {
    return pyxios.post(`/api/rsvps/${id}/`, data)
    	.then(checkStatus);
  },
  deleteRsvp: (id) => {
    return pyxios.delete("/api/rsvps/" + id + "/")
    	.then(checkStatus);
  },

  //=================|
  //=== INVITEES ====|
  //=================|
  getInvitee: (id) => {
    return pyxios.get(`/api/invitees/${id}/`)
      .then(checkStatus);
  },
  getInvitees: () => {
    return axios.get("/api/invitees/")
      .then(checkStatus);
  },
  getInviteesOnRsvp: (id) => {
    return axios.get(`/api/invitees/?rsvp=${id}`) // ###########
      .then(checkStatus);
  },
  createInvitee: (data) => {
    return pyxios.post("/api/invitees/", data)
      .then(checkStatus)  
  },
  updateInvitee: (id, data) => {
    return axios.put(`/api/invitees/${id}/`, data)
      .then(checkStatus);
  },
  deleteInvitee: (id) => {
    return pyxios.delete(`/api/invitees/${id}/`)
      .then(checkStatus);
  },


}