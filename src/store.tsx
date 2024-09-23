import { createStore, combineReducers } from 'redux';
import cartReducer from './components/header/cart/CartReducer';
import orderRegReducer from './components/header/cart/OrderRegReducer';

const routerReducer = combineReducers({
	cart: cartReducer,
	orderReg: orderRegReducer,
})

const store = createStore(routerReducer);
export default store;
