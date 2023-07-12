import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MasterCard from '../../layout/MasterCard/MasterCard';
import { Typography } from '@mui/material';
import CButton from '../../ui/Button/CButton';
import { LoginRounded } from '@mui/icons-material';
import ROUTES_ENUM from '../../../enums/routesEnum';

const CreateUserConfirmation = function () {
	const navigate = useNavigate();
	const email = localStorage.getItem('storedEmail');

	const reSend = () => {
		alert("Llama al servicio requestPass")
	};

	return (
		<MasterCard
			logoComponent
			headerTitle="¡Ya sos parte de la liga!"
			headerSubtitle={
				<span>
					Te enviamos un e-mail a <span style={{ borderBottom: '8px solid #e3f54a' }}>{ email }</span> para que puedas ingresar a tu cuenta
				</span>
			}

			footerComponent
			footerBtnTitle='Ir al login'
			footerBtnIcon={ <LoginRounded /> }
			onClick={() => navigate(ROUTES_ENUM.AUTH_LOGIN)}
		>
			<Typography mb={2}>
				¿No recibiste el e-mail?
			</Typography>
			<CButton
				type="submit"
				title="Reenviar e-mail"
				sx={{fontSize: '1rem'}}
				onClick={reSend}
			/>
		</MasterCard>
	);
};

export default CreateUserConfirmation;
