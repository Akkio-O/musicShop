import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// components actions
import { updateCartItemCount } from './CartAction';

// icon
import { AddCircle, RemoveCircle, DeleteForever } from '@mui/icons-material';
// contenent
import { IconButton, Grid, CardContent, CardMedia, Typography } from '@mui/material';

// type
import { CartItemWithCount } from './typesCart';
export default function CartItem({ item, handleRemoveToProduct }: { item: CartItemWithCount; handleRemoveToProduct: (id: number) => void }) {
	return (
		<Grid container justifyContent="space-between" alignItems="center" className='productCardCart__wrapper' key={item.id}>
			<div className='productCardCart__wrapper_content'>
				<Grid item xs={12} sm={6} md={4}>
					<CardMedia
						component="img"
						alt={item.name}
						className='productCardCart__wrapper_content-imgCard'
						image={item.image}
					/>
					<div className='productCardCart__wrapper_content-counter'>
						<ButtonCount item={item} />
					</div>
				</Grid>
				<CardContent>
					<Typography variant="h6" component="div" color='#1c1c27'>{item.name}</Typography>
					<Typography variant="h6" component="div" color="#aaaaaa">{item.price} ₽</Typography>
				</CardContent>
			</div>
			<Grid height={'230px'} justifyContent="space-between" alignItems="center" display="flex" flexDirection="column">
				<IconButton aria-label="delete" onClick={() => handleRemoveToProduct(item.id)}>
					<DeleteForever className="cursorPointer" />
				</IconButton>
				<Typography variant="h6" component="div" color="#1c1c27">
					{item.price * item.count} ₽
				</Typography>
			</Grid>
		</Grid>
	);
}
function ButtonCount({ item }: { item: CartItemWithCount }) {
	const dispatch = useDispatch();
	const [count, setCount] = useState(item.count);

	function handleCount(step: number) {
		if (count + step > 0) {
			setCount(count + step);
			dispatch(updateCartItemCount(item.id, count + step));
		}
	}

	return (
		<>
			<RemoveCircle className='minus' onClick={() => handleCount(-1)} />
			{count}
			<AddCircle className='plus' onClick={() => handleCount(1)} />
		</>
	);
}
