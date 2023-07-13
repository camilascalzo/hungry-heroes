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
	// http://localhost:3000/Accounts/verify-email?token=62F05474BA68DD70B50F5962F22A87FA97A3401CDBB471C7408BDD5A493BD93DE8B3806ADDB963F5C37B019658CE7D8899029A49939FCE13CF9B4BE6128E5E26

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