import requester from "./requester.js";


// ===============================================
// basic update of store without updating database:
// ===============================================
export const updateStore = (chicken) => (dispatch) => {
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
}
// ========================================
// ACTIONS making a request to the database:
// ========================================
export const getRsvp = (id) => (dispatch) => {
	requester.getRsvp(id)
	.then(response => {
		if (response.status >= 200 && response.status < 300) {

			console.log("getRsvp response = ", response);
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});

			requester.getInviteesOnRsvp(id).then(res => {
				console.log("getInviteesOnRsvp res = ", res.data);
				if (res.status >= 200 && res.status < 300) {
					dispatch({
						type: "UPDATE_STORE",
						payload: Object.assign({}, res.data),
					});
				}
			})
		}
	})

}
export const updateRsvp = (id, data) => (dispatch) => {
	requester.updateRsvp(id, data).then(res => {
		if (res.status >= 200 && res.status < 300) {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, data),
			});
		}
	});
}

export const getInvitee = (id) => (dispatch) => {
	requester.getInvitee(id).then(response => {
		console.log("getInvitee ___ ", response);
		// dispatch({
		// 	type: "UPDATE_STORE",
		// 	payload: Object.assign({}, response.data),
		// });
	})
}
export const getInvitees = () => (dispatch) => {
	requester.getInvitees().then(res => {
		console.log("getInvitees res = ", res);
		dispatch({
			type: "UPDATE_STORE",
			payload: Object.assign({}, { allInvitees: res.data }),
		});
	})
}
export const updateInvitee = (chicken) => (dispatch) => {
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
	requester.updateInvitee(chicken).then(res => {
		console.log("updateInvitee res: ", res);
	});
}