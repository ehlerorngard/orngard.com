import axios from "axios";


// to use this custom base, replace all the axios.whatever calls
// with pyxios.whatever below;  adjust to remove "/api"(?)
const pyxios = axios.create({
  baseURL: 'https://whateveritscalleddd.herokuapp.com/',
  timeout: 1500,
})



function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

export default {
  getCsrfToken: () => {
    return axios.get("/api/csrf/")
    .then(checkStatus)
    .then(parseJSON);
  },
  // ======================

	getRsvp: (id, data) => {
    return axios.get("/api/task/" + id, data)
    	.then(checkStatus)
    	.then(parseJSON);
  },
  getRsvps: (data) => {
    return axios.get("/api/task/", data)
    	.then(checkStatus)
    	.then(parseJSON);
  },
	createRsvp: (data) => {
    return axios.put("/api/task/", data)
    	.then(checkStatus)
    	.then(res => {
        setTimeout(() => {
          console.log("VOLVIÓ! ", res);
        }, 2500);
      });		
	},
  editRsvp: function(id, data) {
    return axios.post("/api/task/" + id, data)
    	.then(checkStatus)
    	.then(parseJSON);
  },
  deleteRsvp: (id, data) => {
    return axios.delete("/api/task/" + id, data)
    	.then(checkStatus)
    	.then(parseJSON);
  },


}