import { CartItem } from './typesCart';

export const addToCart = (product: CartItem) => ({
	type: 'ADD_TO_CART',
	payload: product,
});

export const removeFromCart = (id: number) => ({
	type: 'REMOVE_FROM_CART',
	payload: { id },
});
export const updateCartItemCount = (id: number, count: number) => ({
    type: 'UPDATE_CART_ITEM_COUNT',
    payload: { id, count },
});