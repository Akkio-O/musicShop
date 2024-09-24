import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components actions
import { removeFromCart } from './CartAction';

// components
import CartItem from './CartItems';
import OrderRegistration from './orderRegistration/OrderRegistration';

// icon
// contenent
import { Box, Typography } from '@mui/material';

// type
import { RootState, CartItemWithCount } from './typesCart';


export default function CustomizedBadges() {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItemWithCount[]);
	const [price, setPrice] = useState(0);

	const totalPrice = useMemo(() => {
		return cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
	}, [cartItems]);

	useEffect(() => { setPrice(totalPrice) }, [totalPrice]);

	const handleRemoveToProduct = useCallback((id: number) => {
		dispatch(removeFromCart(id));
	}, [dispatch]);

	return (
		<>
			<Box className="scroll" sx={cartItems.length === 0 ? 
				{ mx: 'auto', pt: 2, px: 4, pb: 3 } 
				: { pt: 2, px: 4, pb: 3 }}>
				<h2 id="parent-modal-title">Корзина</h2>
				<div id="parent-modal-description">
					{cartItems.length === 0 ? (
						<p>Корзина пуста</p>
					) : (
						<>
							<ul className='productCardCart'>
								{cartItems.map((item) => (
									<CartItem key={item.id} item={item} handleRemoveToProduct={handleRemoveToProduct} />
								))}
							</ul>
							<section className='productsTotal'>
								<Typography variant="h6" component="div" color="#1c1c27">{price} ₽ Итого</Typography>
								<OrderRegistration />
							</section>
						</>

					)}
				</div>
			</Box>
		</>
	);
}

