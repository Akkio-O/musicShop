import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, Modal, Box, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// components
import { StoreSelector } from './StoreSelector';
import SelectedStore from './SelectedStore';
// components

// types
import { RootState, CartItemWithCount } from '../typesCart';


const style: React.CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	maxHeight: '80vh',
	backgroundColor: 'rgb(234, 234, 234)',
	boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
	overflowY: 'auto',
};

export default function OrderRegistration(): JSX.Element {
	const [phone, setPhone] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [paymentMethod, setPaymentMethod] = React.useState('card');
	const [open, setOpen] = React.useState(false);
	const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);


	const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItemWithCount[]);

	const handlePaymentSelection = (method: string) => {
		setSelectedMethod(method);
	};

	const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(event.target.value);
	};
	const handleOpen = React.useCallback(() => { setOpen(true); }, []);
	const handleClose = React.useCallback(() => { setOpen(false); }, []);

	const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
	return (
		<React.Fragment>
			<Button className='productsTotal__button' onClick={handleOpen}>Перейти к оформлению</Button>
			<Modal keepMounted
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box className='scroll' sx={{ ...style, width: 1200, borderRadius: '30px 0 0 30px'}} pt={2} px={4} pb={3}>
					<div className='modal__header'>
						<h2 id="child-modal-title">Оформление заказа</h2>
						<Button onClick={handleClose}>X</Button>
					</div>
					<Typography variant="h6" component="div" color="#1c1c27" sx={{ mt: 2 }}>
						Выбрано товаров: {cartItems.length} шт.
						За {totalPrice} шт.
					</Typography>
					<div id="child-modal-description">
						<Typography variant="h6" component="div" color="#1c1c27" sx={{ mt: 2 }}>
							Данные покупателя
						</Typography>
						<Grid container spacing={5}>
							<Grid item xs={6} sm={6} md={6} >
								<TextField
									fullWidth
									label="Телефон"
									variant="outlined"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									sx={{ mt: 2 }}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={6} >
								<TextField
									fullWidth
									label="email(необязательно)"
									variant="outlined"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									sx={{ mt: 2 }}
								/>
							</Grid>
						</Grid>
						<Grid container className='orderReg__wrapper_content' spacing={2} mt={2}>
							<Grid item xs={6} sm={6} md={6} >
								<Typography variant="h6" color="#1c1c27" sx={{ mt: 2 }}>
									Название магазина
									<Typography variant="body1" color="#1c1c27" sx={{ mt: 2 }}>
										График работы
									</Typography>
								</Typography>
								<Typography variant="body1" component="div" color="#1c1c27" sx={{ mt: 2 }}>
									Можно забрать заказ:
									<Grid container>
										<Grid item xs={6} sm={6} md={6}>
											<Typography variant="h6" component="div" color="#1c1c27" sx={{ mt: 2 }}>
												Послезавтра (с 16:00)
											</Typography>
										</Grid>
										<Grid item xs={6} sm={6} md={6}>
											<Typography variant="h6" component="div" color="#1c1c27" sx={{ mt: 2 }}>
												Срок хранения: 3 дня
											</Typography>
										</Grid>
									</Grid>
								</Typography>
								<StoreSelector style={style} />
							</Grid>
							<Grid item xs={6} sm={6} md={6} >
								<SelectedStore />
							</Grid>
						</Grid>

						<Typography variant="h6" component="div" color="#1c1c27" sx={{ mt: 2 }}>
							Выберите способ оплаты
						</Typography>
						<Grid container gap={2}>
							<Button
								variant={selectedMethod === 'online' ? "contained" : "outlined"}
								color="primary"
								sx={{ mt: 2 }}
								onClick={() => handlePaymentSelection('online')}
							>
								Онлайн
							</Button>
							<Button
								variant={selectedMethod === 'delivery' ? "contained" : "outlined"}
								color="primary"
								sx={{ mt: 2 }}
								onClick={() => handlePaymentSelection('delivery')}
							>
								При получении
							</Button>
							<Button
								variant={selectedMethod === 'installments' ? "contained" : "outlined"}
								color="primary"
								sx={{ mt: 2 }}
								onClick={() => handlePaymentSelection('installments')}
							>
								В рассрочку
							</Button>
						</Grid>

						<RadioGroup
							value={paymentMethod}
							onChange={handlePaymentMethodChange}
						>
							<FormControlLabel value="card" control={<Radio />} label="Карта" />
						</RadioGroup>
					</div>
				</Box>
			</Modal>
		</React.Fragment>
	);
}