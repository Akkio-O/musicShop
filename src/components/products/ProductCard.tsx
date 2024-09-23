import { Grid, Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../header/cart/CartAction';

import { ProductWithRating, Category } from '../../types';

// Типы
interface ProductProps {
	products: Category[];
}

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

export default function ProductCard({ products }: ProductProps): JSX.Element {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);

	const handleAddToCart = (item: ProductWithRating) => {
		let existingItem = cartItems.find(cartItem =>
			cartItem.id === item.id && cartItem.category === item.category
		);
		!existingItem && dispatch(addToCart(item));
	};

	return (
		<div className='pageContainer'>
			<Grid container spacing={2}>
				{products.map(category => (
					<div key={category.id} className='pageContainer__wrapper'>
						<Typography className='pageContainer__wrapper_text' variant="h6" gutterBottom>
							{category.name}
						</Typography>
						<Grid container spacing={2}>
							{category.product.map(item => (
								<Grid item xs={12} sm={6} md={4} key={`${item.id}-${item.category}`}>
									<Card className='imgCard'>
										<CardMedia
											component="img"
											alt={item.name}
											className='imgCard__img'
											image={item.image}
											sx={{ height: "200px", objectFit: "contain" }}
										/>
										<CardContent className='imgCard__content'>
											<Grid container justifyContent="space-between" alignItems="center">
												<Typography variant="h6" component="div">
													{item.name}
												</Typography>
												<Typography variant="h6" component="div" color="#ffa542">
													{item.price} ₽
												</Typography>
											</Grid>
											<Grid container justifyContent="space-between" alignItems="center" mt={2}>
												{item.rating !== undefined && (
													<Box display="flex" alignItems="center">
														<StarIcon style={{ color: '#ffa542' }} />
														<Typography variant="body2" color="textSecondary">
															{item.rating}
														</Typography>
													</Box>
												)}
												<Button onClick={() => handleAddToCart(item)} style={{ color: 'black' }} variant="text">
													Купить
												</Button>
											</Grid>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</div>
				))}
			</Grid>
		</div>
	);
}
