import React from 'react';
import { useNavigate } from 'react-router-dom';
import MasterCard from '../../layout/MasterCard/MasterCard';
import ROUTES_ENUM from '../../../enums/routesEnum';
import CButton from '../../ui/Button/CButton';

const ChangePassConfirmation = function () {
	const navigate = useNavigate();

	return (
		<MasterCard
			logoComponent
			headerTitle="¡Ya cambiamos tu contraseña!"
			headerSubtitle={`Por favor, volvé a ingresar a tu cuenta`}
		>
			<CButton 
				title="Ingresar a mi cuenta"
				sx={{fontSize: '1rem'}}
				onClick={() => navigate(ROUTES_ENUM.AUTH_LOGIN)}
			/>
		</MasterCard>
	);
};

export default ChangePassConfirmation;
