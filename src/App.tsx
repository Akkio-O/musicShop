// React Tools
import { Route, Routes } from "react-router-dom"

// types
import { Category, InputData } from "./types";

// styles
import "./sass/index.sass";

// components
import Header from "./components/Header";
import Login from "./components/header/auth/Login";
import Register from "./components/header/auth/Register";
import Products from "./components/products/ProductCard";
import Cart from "./components/header/cart/Cart";
import Footer from "./components/Footer";

// data
import products from "./data/products.json";
import inputData from "./data/inputData.json";

// typed data
const typedInputData: InputData[] = inputData;
const typedProducts: Category[] = products;

// component
export default function App() {
	return (
		<div className="container">
			<Header />
			<Routes>
				<Route path='/musicShop/' element={<Products products={typedProducts} />} />
				<Route path='/musicShop/login' element={<Login inputData={typedInputData} />} />
				<Route path='/musicShop/register' element={<Register inputData={typedInputData} />} />
				<Route path='/musicShop/cart' element={<Cart />} />
			</Routes>
			<Footer />
		</div>
	)
}