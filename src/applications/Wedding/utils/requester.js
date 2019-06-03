import axios from "axios";

axios.defaults.withCredentials = true;


// Customize the base for all calls to the Python/Django API:
let pyxios = axios.create({
  baseURL: (process.env.NODE_ENV === "production") 
      ? 'https://orngard.herokuapp.com' 
      : 'http://localhost:8000',
  timeout: 11000,
});

// Once we have a csrf token, call this to create a new axios instance:
const resetAxiosBase = csrfToken => {
  pyxios = axios.create({
    baseURL: (process.env.NODE_ENV === "production") 
        ? 'https://orngard.herokuapp.com/' 
        : 'http://localhost:8000',
    timeout: 6000,
    headers: {'X-CSRFToken': csrfToken}
  });
}

// Handle response errors:
function checkStatus(response) {
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
  // issue to an authorized domain. (This is called when React mounts on page load):
  getCsrfToken: () => {
    return pyxios.get("/csrf/").then(response => {
      let token = response.data.csrftoken;

      // Redefine 'pyxios' variable (a custom axios instance) 
      // to include a CSRF token now that we have it:
      resetAxiosBase(token);

      // Make sure the API is accepting requests with the new CSRF token:
      return pyxios.get("/ping/").then(res => {
        if (res.data.result === "OK") {
          return true;
        }
        // If not, try acquiring a new token:
        else pyxios.get("/csrf/").then(rez => {
          if (rez.data.csrftoken) {
            token = rez.data.csrftoken;
            resetAxiosBase(token);
            return true;
          }
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
    return pyxios.put(`/api/rsvps/${id}/`, data)
    	.then(checkStatus);
  },
  deleteRsvp: (id) => {
    return pyxios.delete("/api/rsvps/" + id + "/")
    	.then(checkStatus);
  },

  //=================|
  //=== Invitees ====|
  //=================|
  getInvitee: (id) => {
    return pyxios.get(`/api/invitees/${id}/`)
      .then(checkStatus);
  },
  getInvitees: () => {
    return pyxios.get("/api/invitees/")
      .then(checkStatus);
  },
  getInviteesOnRsvp: (id) => {
    return pyxios.get(`/api/invitees/?rsvp=${id}`)
      .then(checkStatus);
  },
  createInvitee: (data) => {
    return pyxios.post("/api/invitees/", data)
      .then(checkStatus)  
  },
  updateInvitee: (id, data) => {
    return pyxios.put(`/api/invitees/${id}/`, data)
      .then(checkStatus);
  },
  deleteInvitee: (id) => {
    return pyxios.delete(`/api/invitees/${id}/`)
      .then(checkStatus);
  },

  //=================|
  //==== Messages ===|
  //=================|
  getMessage: (id) => {
    return pyxios.get(`/api/messages/${id}/`)
      .then(checkStatus);
  },
  getMessages: () => {
    return pyxios.get("/api/messages/")
      .then(checkStatus);
  },
  createMessage: (data) => {
    return pyxios.post("/api/messages/", data)
      .then(checkStatus); 
  },
}