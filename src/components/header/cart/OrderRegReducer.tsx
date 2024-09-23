const initialState = {
	map: null,
};

const orderRegReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'ADD_TO_MAP':
			return {
				...state,
				map: action.payload,
			};
		default:
			return state;
	}
};

export default orderRegReducer;
