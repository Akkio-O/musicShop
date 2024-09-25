import { Link as LinkRout } from 'react-router-dom';
import { Grid, Typography, Box, IconButton, Link as MuiLink } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FaVk } from 'react-icons/fa';

export default function Footer() {
	return (
		<Box component="footer" mt={4.5} py={4} px={2} sx={{ backgroundColor: '#fff', borderTop: '1px solid #e0e0e0' }}>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h6" component="div" gutterBottom>
						<LinkRout className='linkIcon' to="/musicShop/">QPICK</LinkRout>
					</Typography>
				</Grid>
				<Grid item>
					<Box>
						<Typography variant="body2">
							<LinkRout className='linkIcon' to="/musicShop/favorite">Избранное</LinkRout>
						</Typography>
						<Typography variant="body2">
							<LinkRout className='linkIcon' to="/musicShop/cart">Корзина</LinkRout>
						</Typography>
						<Typography variant="body2">
							<LinkRout className='linkIcon' to="/musicShop/contacts">Контакты</LinkRout>
						</Typography>
					</Box>
				</Grid>
				<Grid item>
					<Typography variant="body2">
						<MuiLink href="#" color="inherit" underline="none">Условия сервиса</MuiLink>
					</Typography>
				</Grid>

				<Grid item>
					<Box display="flex" alignItems="center">
						<Box mr={2}>
							<Typography variant="body2">
								<MuiLink href="#" color="inherit" underline="none">Рус</MuiLink>{' '}/{' '}
								<MuiLink href="#" color="inherit" underline="none">Eng</MuiLink>
							</Typography>
						</Box>

						<IconButton href="#" color="inherit">
							<FaVk />
						</IconButton>
						<IconButton href="#" color="inherit">
							<TelegramIcon />
						</IconButton>
						<IconButton href="#" color="inherit">
							<WhatsAppIcon />
						</IconButton>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}