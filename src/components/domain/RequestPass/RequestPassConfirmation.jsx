import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MasterCard from '../../layout/MasterCard/MasterCard';
import { Typography } from '@mui/material';
import CButton from '../../ui/Button/CButton';
import { LoginRounded } from '@mui/icons-material';
import ROUTES_ENUM from '../../../enums/routesEnum';
import AuthService from '../../../services/AuthService';
import useSnackbar from '../../../hooks/useSnackbar';
import useLoading from '../../../hooks/useLoading';

const RequestPassConfirmation = function () {
	const navigate = useNavigate();
	const setLoading = useLoading();
	const setSnackbar = useSnackbar();
	const email = localStorage.getItem('storedEmail');

	const reSend = () => {
		setLoading(true);
		AuthService.requestPass(email)
		.then((response) => {
			console.log(response)
			setLoading(false);
			setSnackbar({message: 'El email fue reenviado correctamente', severity: 'success'});
		})
		.catch((error) => {
			console.log(error);
			setSnackbar({message: error.message, severity: 'error'});
		})
	};

	return (
		<MasterCard
			logoComponent
			headerTitle="¡E-mail enviado!"
			headerSubtitle={`Enviamos un e-mail a ${email} para que puedas reestablecer tu contraseña`}
			footerComponent
			footerBtnTitle='Ir al login'
			footerBtnIcon={ <LoginRounded /> }
			onClick={() => navigate(ROUTES_ENUM.AUTH_LOGIN)}
		>
			<Typography mb={2} variant='subtitle1'>
				¿No recibiste el e-mail?
			</Typography>
			<CButton
				type="submit"
				title="Reenviar e-mail"
				sx={{fontSize: '1.2rem'}}
				onClick={reSend}
			/>
		</MasterCard>
	);
};

export default RequestPassConfirmation;
