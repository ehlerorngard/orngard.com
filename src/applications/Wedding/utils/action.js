import requester from "./requester.js";


// ===============================================
// basic update of store without updating database:
// ===============================================
export const updateStore = (chicken) => (dispatch) => {
	console.log("SHOULD be updating store with this: ", chicken);
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
}