import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, List, ListItemText, Menu, Divider, MenuItem, Typography } from '@mui/material';
import CButton from '../../ui/Button/CButton';
import ROUTES_ENUM from '../../../enums/routesEnum';
import { getHome } from '../../../utils/navUtils';
import logo from '../../../media/logo-light.png'
import AuthService from '../../../services/AuthService';
import styles from './Header.module.scss';
import { ExitToAppRounded, LockRounded, ManageAccountsRounded, PersonRemoveRounded, ShoppingCart, Home} from '@mui/icons-material';

const Header = function () {

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const location = useLocation();
	const userRole = localStorage.getItem('role');

	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

	const handleClose = () => {
    setAnchorEl(null);
  };

	const onLogout = () => {
		AuthService.logout()
		navigate(ROUTES_ENUM.AUTH_LOGIN);
	};

  return (
		<AppBar
			position="static"
			className={styles.container}
		>
			<Toolbar className={styles.toolbar}>
				<Box className={styles.logoContainer}>
					<Link to={ (getHome(userRole)) }>
					<img
						alt="Logo de Hungry Heroes"
						src={logo}
						className={styles.logo}
					/>
					</Link>
				</Box>
				<Box>
					<CButton
						onClick={handleClick}
						title="menú"
						className={styles.menubtn}
						sx={{fontSize: "1.2rem", color: '#fff', border: 'solid 2px #fff'}}
					/>
					<Menu
						open={open}
						onClose={handleClose}
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							horizontal: 'right',
							vertical: 'top'
						}}
						classes={{ paper: styles['menu-paper'] }}
					>
						<List>
						<ListItemText sx={{ textAlign: 'left'}} >
									<CButton
										variant="text"
										title="Inicio"
										startIcon={<Home />}
										sx={{ fontSize: '0.9rem'}}
										onClick={() => navigate(getHome(userRole))}
									/>
								</ListItemText>
							{userRole==='Business' ? (
								<ListItemText sx={{ textAlign: 'left'}} >
									<CButton
										variant="text"
										title="Perfil"
										startIcon={<ManageAccountsRounded />}
										sx={{ fontSize: '0.9rem'}}
										onClick={() => navigate(ROUTES_ENUM.PROFILE)}
									/>
								</ListItemText>
							):null}
							{userRole === 'Client' ? (
								<ListItemText sx={{ textAlign: 'left'}}>
									<CButton
										variant="text"
										title="Mis compras"
										sx={{ fontSize: '0.9rem'}}
										startIcon={ <ShoppingCart /> }
										onClick={() => navigate(ROUTES_ENUM.SALES)}
									/>
								</ListItemText>
							):(
								<ListItemText sx={{ textAlign: 'left'}}>
								<CButton
									variant="text"
									title="Mis ventas"
									sx={{ fontSize: '0.9rem'}}
									startIcon={ <ShoppingCart /> }
									onClick={() => navigate(ROUTES_ENUM.SALES)}
								/>
							</ListItemText>
							)}
							<ListItemText sx={{ textAlign: 'left'}}>
								<CButton
									variant="text"
									title="Cambiar contraseña"
									sx={{ fontSize: '0.9rem'}}
									startIcon={ <LockRounded /> }
									onClick={() => navigate(ROUTES_ENUM.AUTH_CHANGE_PASS)}
								/>
							</ListItemText>
							<ListItemText sx={{ textAlign: 'left'}}>
								<CButton
									variant="text"
									title="Cerrar sesión"
									sx={{ fontSize: '0.9rem'}}
									startIcon={ <ExitToAppRounded /> }
									onClick={onLogout}
								/>
							</ListItemText>
							<Divider sx={{marginTop: '1.5rem'}}/>
							<ListItemText sx={{ textAlign: 'left'}}>
								<CButton
									variant="text"
									title="Eliminar cuenta"
									sx={{ fontSize: '0.8rem'}}
									startIcon={ <PersonRemoveRounded /> }
									onClick={() => navigate(ROUTES_ENUM.REMOVE_ACCOUNT)}
								/>
							</ListItemText>
						</List>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
  );
};

export default Header;
