import React from "react";
import { Formik, Form } from "formik";
import MasterCard from "../../layout/MasterCard/MasterCard";
import CTextField from "../../ui/form/CTextField";
import CButton from "../../ui/Button/CButton";
import { Grid, Typography } from "@mui/material";
import * as Yup from 'yup';
import AuthService from "../../../services/AuthService";
import useLoading from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import ROUTES_ENUM from "../../../enums/routesEnum";
import useSnackbar from "../../../hooks/useSnackbar";

const ChangePass = function () {

	const setLoading = useLoading();
	const navigate = useNavigate();
	const userEmail = localStorage.getItem('email');
	const userId = localStorage.getItem('id');
	const setSnackbar = useSnackbar();

	const VALIDATION = Yup.object().shape({
		oldPassword: Yup.string().required('Campo obligatorio'),
		newPassword: Yup.string().required('Campo obligatorio')
			.min(8, 'Debe contener al menos 8 caracteres')
			.max(20, "Debe contener un máximo de 20 caracteres"),
		confirmPassword: Yup.string().required('Campo obligatorio')
		.oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
	});

	const onSubmit = (values) => {
		setLoading(true);
		AuthService.changePassword(userId, values)
		.then(() => {
			setLoading(false);
			setSnackbar({message: 'La contraseña se actualizó correctamente', severity: 'error'});
			navigate(ROUTES_ENUM.AUTH_CHANGE_PASS_CONFIRMATION);
		})
		.catch((error) => {
			setLoading(false);
			setSnackbar({message: error.message, severity: 'error'});
			console.log(error);
		})
	}

	return (
		<MasterCard
			headerTitle="Cambiar contraseña"
		>
			<Formik
				initialValues={{
					email: userEmail,
					oldPassword: '',
					newPassword: '',
					confirmPassword: ''
				}}
				validationSchema={ VALIDATION }
				onSubmit={onSubmit}
				>
				{(formik) => (
					<Form>
						<Grid container rowSpacing={3}>
							<Grid item xs={12}>
								<CTextField
									required
									label="email"
									name="email"
									disabled
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									label="Contraseña actual"
									name="oldPassword"
									type="password"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									label="Nueva contraseña"
									name="newPassword"
									type="password"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									label="Repetir nueva contraseña"
									name="confirmPassword"
									type="password"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12} mt={6}>
								<CButton
									type="submit"
									title="Guardar contraseña"
									variant="outlined"
									color="secondary"
									sx={{fontSize: '1rem'}}
								/>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</MasterCard>

	);
};

export default ChangePass;