import { Grid, Typography, Box, IconButton, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FaVk } from 'react-icons/fa';

export default function Footer() {
	return (
		<Box component="footer" mt={4.5} py={4} px={2} sx={{ backgroundColor: '#fff', borderTop: '1px solid #e0e0e0' }}>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h6" component="div" gutterBottom>QPICK</Typography>
				</Grid>
				<Grid item>
					<Box>
						<Typography variant="body2">
							<Link href="#" color="inherit" underline="none">Избранное</Link>
						</Typography>
						<Typography variant="body2">
							<Link href="#" color="inherit" underline="none">Корзина</Link>
						</Typography>
						<Typography variant="body2">
							<Link href="#" color="inherit" underline="none">Контакты</Link>
						</Typography>
					</Box>
				</Grid>
				<Grid item>
					<Typography variant="body2">
						<Link href="#" color="inherit" underline="none">Условия сервиса</Link>
					</Typography>
				</Grid>

				<Grid item>
					<Box display="flex" alignItems="center">
						<Box mr={2}>
							<Typography variant="body2">
								<Link href="#" color="inherit" underline="none">Рус</Link>{' '}/{' '}
								<Link href="#" color="inherit" underline="none">Eng</Link>
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
