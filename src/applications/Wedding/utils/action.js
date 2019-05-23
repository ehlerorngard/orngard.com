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
				payload: Object.assign({}, { 
					rsvp: response.data,
					attending: response.data.attending,
					numChildren: response.data.numChildren,
					numAdults: response.data.numAdults,
					numVeg: response.data.numVeg,
					numInviteesAlotted: response.data.numInviteesAlotted,
					numNoGluten: response.data.numNoGluten,
					numNoDairy: response.data.numNoDairy,
					lodging: response.data.lodging,
					arrivalDay: response.data.arrivalDay,
					departureDay: response.data.departureDay,
					FridayDinner: response.data.FridayDinner, 
				    SaturdayBreakfast: response.data.SaturdayBreakfast, 
				    SaturdayLunch: response.data.SaturdayLunch, 
				    SaturdayDinner: response.data.SaturdayDinner, 
				    SundayBrunch: response.data.SundayBrunch,
					additionalNotes: response.data.additionalNotes,
				}),
			});

			requester.getInviteesOnRsvp(id).then(res => {

				console.log("getInviteesOnRsvp res = ", res.data);
				if (res.status >= 200 && res.status < 300) {
					dispatch({
						type: "UPDATE_STORE",
						payload: Object.assign({}, { attendeesPossible: res.data }),
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
		if (response.status >= 200 && response.status < 300) {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, { user: response.data, sandboxMode: true }),
			});
		}
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
export const getInviteesOnRsvp = (id) => (dispatch) => {
	requester.getInviteesOnRsvp(id).then(res => {
		console.log("getInvitees res = ", res);
		dispatch({
			type: "UPDATE_STORE",
			payload: Object.assign({}, { attendeesPossible: res.data }),
		});
	})
}
export const updateInvitee = (id, chicken, attendees) => (dispatch) => {
	requester.updateInvitee(id, chicken).then(res => {
		console.log("updateInvitee res: ", res);
		attendees.forEach((atn, i) => {
			if (atn.id === id) {
				attendees[i] = chicken;
				dispatch({
					type: "UPDATE_STORE",
					payload: Object.assign({}, { attendeesPossible: attendees }),
				});
			}
		})
	});
}
export const createMessage = (data) => (dispatch) => {
	requester.createMessage(data).then(res => {
		console.log("createMessage res = ", res);
		dispatch({
			type: "UPDATE_STORE",
			payload: Object.assign({}, { messageCreated: data }),
		});
	})
}