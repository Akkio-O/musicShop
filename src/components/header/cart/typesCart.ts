export interface RootState {
	cart: {
		cartItems: {
			id: number;
			name: string;
			price: number;
			image: string;
			category: string;
		}[];
	};
}
export type CartItem = {
	id: number;
	name: string;
	price: number;
	image: string;
	category: string;
};
export interface CartItemWithCount extends CartItem {
	count: number;
}
// action types
export interface CartState {
	cartItems: CartItemWithCount[];
}

export type CartAction =
	| { type: 'ADD_TO_CART'; payload: CartItem }
	| { type: 'REMOVE_FROM_CART'; payload: { id: number } }
	| { type: 'UPDATE_CART_ITEM_COUNT'; payload: { id: number; count: number } };
