import axios from "axios";

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

	getPotato: (id, potatumDatum) => {
    return axios.get("/api/tasks/" + id, potatumDatum)
    	.then(checkStatus)
    	.then(parseJSON);
  },
  getPotatoes: (potatumDatum) => {
    return axios.get("/api/tasks/", potatumDatum)
    	.then(checkStatus)
    	.then(parseJSON);
  },
	createPotato: (potatumDatum) => {
    return axios.put("/api/tasks/", potatumDatum)
    	.then(checkStatus)
    	.then(res => {
        setTimeout(() => {
          // dispatch(onSuccessFunction(parseJSON(res).data));  // <––– to dispatch an action on res success
        }, 2500);
      });		
	},
  editPotato: function(id, potatumDatum) {
    return axios.post("/api/tasks/" + id, potatumDatum)
    	.then(checkStatus)
    	.then(parseJSON);
  },
  deletePotato: (id, potatumDatum) => {
    return axios.delete("/api/tasks/" + id, potatumDatum)
    	.then(checkStatus)
    	.then(parseJSON);
  },


}