import React, { useState } from 'react';
import MasterCard from '../components/layout/MasterCard/MasterCard';
import { HowToRegRounded, LoginRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useLoading from '../hooks/useLoading';
import AuthService from '../services/AuthService';
import useSnackbar from '../hooks/useSnackbar';
import ROUTES_ENUM from '../enums/routesEnum';

const VerifyRegistrationTokenPage = function () {
	const navigate = useNavigate();
	const setSnackbar = useSnackbar();
	const setLoading = useLoading();
	const [displayConfirmation, setDisplayConfirmation] = useState();
	// const token = recuperar desde url

	const verifyAccount = () => {
		setLoading(true);
		AuthService.verifyAccount()
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
			headerTitle="Verificá tu cuenta"
			headerSubtitle={!displayConfirmation ? 'Por favor, necesitamos que verifiques tu cuenta para que puedas ser parte de la comunidad de héroes' : '¡Tu cuenta ha sido verificada! Ya podés ingresar a ingresar a hungry heroes'}
			footerComponent
			footerBtnTitle= {!displayConfirmation ? 'Verificar mi cuenta' : 'Ir al login'}
			footerBtnIcon={!displayConfirmation ? <HowToRegRounded /> :<LoginRounded /> }
			onClick={!displayConfirmation ? () => verifyAccount() : navigate(ROUTES_ENUM.AUTH_LOGIN)}
		>
		</MasterCard>
	);
};

export default VerifyRegistrationTokenPage;