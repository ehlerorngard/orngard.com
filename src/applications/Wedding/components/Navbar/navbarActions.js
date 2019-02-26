import requester from "../../utils/requester.js";


// ===============================================
// basic update of store without updating database:
// ===============================================
export const updateStore = (chicken) => (dispatch) => {
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
}


// =================================
// ASYNC FUNCTION WITH REQUEST TO DB
// =================================
export const requestToDatabase = (chicken) => (dispatch) => {
	requester.makeRequest(chicken)
		.then(rez => {	
			dispatch({
				type: "REQ_TO_DATABASE",
				payload: { ...chicken },
			});
		});
}


