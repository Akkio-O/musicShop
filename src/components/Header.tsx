import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

// components

// content
import { IconButton } from '@mui/material';

// icons
import { Favorite, ShoppingCart } from '@mui/icons-material';

// types
import { RootState, CartItemWithCount } from './header/cart/typesCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		vertical: 'top',
		horizontal: 'right',
		backgroundColor: `#ffa542`,
		padding: '0 4px',
	},
}));

export default function Header() {
	const cartItems = useSelector((state: RootState) => state.cart.cartItems as CartItemWithCount[]);
	return (
		<header className="header">
			<h1><Link className="links" to="/musicShop/">QPICK</Link></h1>
			<nav className='header__wrapper'>
				<Link className="links" to='/musicShop/login'>Авторизация</Link>
				<Link className="links" to='/musicShop/register'>Регистрация</Link>
				<Link className="links" to='/musicShop/'>Категория</Link>
				<Link to='/favorites'>
					<IconButton aria-label="favorite">
						<StyledBadge badgeContent={4} color="secondary">
							<Favorite />
						</StyledBadge>
					</IconButton>
				</Link>
				<Link to='/musicShop/cart'>
					<IconButton aria-label="cart">
						<StyledBadge badgeContent={cartItems.length} color="secondary">
							<ShoppingCart />
						</StyledBadge>
					</IconButton>
				</Link>
			</nav>
		</header>
	)
}