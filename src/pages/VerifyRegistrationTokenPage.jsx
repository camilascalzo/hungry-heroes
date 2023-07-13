import React, { useEffect, useState } from 'react';
import MasterCard from '../components/layout/MasterCard/MasterCard';
import { HowToRegRounded, LoginRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoading from '../hooks/useLoading';
import AuthService from '../services/AuthService';
import useSnackbar from '../hooks/useSnackbar';
import ROUTES_ENUM from '../enums/routesEnum';

const VerifyRegistrationTokenPage = function () {
	const navigate = useNavigate();
	const location = useLocation();
	const setSnackbar = useSnackbar();
	const setLoading = useLoading();
	const [displayConfirmation, setDisplayConfirmation] = useState();
	const [token, setToken] = useState();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		setToken(token);
	}, [location]);

	const verifyAccount = () => {
		setLoading(true);
		AuthService.verifyAccount(token)
		.then(() => {
			setLoading(false);
			setDisplayConfirmation(true);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
			setSnackbar({message: error.message, severity: 'error'});
		})
	}

	return (
		<MasterCard
		  logoComponent
			headerTitle={!displayConfirmation ? "Verificá tu cuenta" : '¡tu cuenta fue verificada!' }
			headerSubtitle={!displayConfirmation ? 'Por favor, necesitamos que verifiques tu cuenta para que puedas ser parte de la comunidad de héroes' : 'Ya podés ingresar usando tu email y contraseña'}
			footerComponent
			footerBtnTitle= {!displayConfirmation ? 'Verificar mi cuenta' : 'ingresar'}
			footerBtnIcon={!displayConfirmation ? <HowToRegRounded /> :<LoginRounded /> }
			onClick={!displayConfirmation ? () => verifyAccount() : () => navigate(ROUTES_ENUM.AUTH_LOGIN)}
		>
		</MasterCard>
	);
};

export default VerifyRegistrationTokenPage;