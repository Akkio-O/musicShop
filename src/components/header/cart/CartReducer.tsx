import { CartState, CartAction, CartItemWithCount } from './typesCart';

const initialState: CartState = {
	cartItems: [],
}

const cartReducer = (state = initialState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const existingItem = state.cartItems.find(item =>
				item.id === action.payload.id && item.category === action.payload.category
			);

			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map(item =>
						item.id === action.payload.id && item.category === action.payload.category
							? { ...item, count: item.count + 1 }
							: item
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, { ...action.payload, count: 1 }],
				};
			}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cartItems: state.cartItems.filter((cartItem: CartItemWithCount) => cartItem.id !== action.payload.id),
			};
		case 'UPDATE_CART_ITEM_COUNT':
			return {
				...state,
				cartItems: state.cartItems.map(item =>
					item.id === action.payload.id
						? { ...item, count: action.payload.count }
						: item
				),
			};
		default:
			return state;
	}
};

export default cartReducer;