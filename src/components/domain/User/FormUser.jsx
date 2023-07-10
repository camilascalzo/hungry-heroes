import React, { useRef } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, RadioGroup, FormControl, Radio, FormControlLabel, Box, Typography } from '@mui/material';
import ROUTES_ENUM from '../../../enums/routesEnum';
import CTextField from '../../ui/form/CTextField';
import CButton from '../../ui/Button/CButton';

import styles from './FormUser.module.scss';
import AuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';
import useSnackbar from '../../../hooks/useSnackbar';

const FormUser = function () {

	const formikRef = useRef();
	const navigate = useNavigate();
	const setLoading = useLoading();
	const setSnackbar = useSnackbar();

	const VALIDATION = Yup.object().shape({
		email: Yup.string()
			.email('Usuario inválido - usuario@email.com')
			.required('Campo obligatorio'),
		password: Yup.string().required('Campo obligatorio')
			.min(8, 'Debe contener al menos 8 caracteres')
			.max(20, 'Debe contener un máximo de 20 caracteres'),
		confirmPassword: Yup.string()
		.required('Campo obligatorio')
		.min(8, 'Debe contener al menos 8 caracteres')
		.max(20, 'Debe contener un máximo de 20 caracteres')
		.oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
		role: Yup.string().required('Campo obligatorio')
	});

	const onRegister = (values) => {
		setLoading(true);
		AuthService.register(values)
		.then(() => {
			navigate(ROUTES_ENUM.CREATE_ACCOUNT_CONFIRMATION);
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
			setSnackbar({message: error.message, severity: 'error'});
		})
	}

	return (
		<Box className={styles.container}>
			<Typography className={styles.title} mb={3}>Completá los datos y unite a la liga hambrienta</Typography>
			<Formik
				initialValues={{
					email: '',
					password: '',
					confirmPassword: '',
					role: ''
				}}
				validationSchema={VALIDATION}
				onSubmit={onRegister}
				innerRef={formikRef}
			>
				{(formik) => (
					<Form>
						<Grid
							container
							rowSpacing={4}
							alignContent="center"
							alignItems="center"
							justifyContent="center"
							justifyItems="center"
						>
							<Grid item xs={12}>
								<CTextField
									label="Usuario"
									name="email"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									label="Contraseña"
									type="password"
									name="password"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									label="Repetir contraseña"
									type="password"
									name="confirmPassword"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl component="fieldset" className={styles.error}>
									<RadioGroup 
										name='role'
										value={formik.values.role}
										onChange={formik.handleChange}
										className={styles.radiobtncontainer}
										error={formik.touched.userType && Boolean(formik.errors.userType)}
									>
										<FormControlLabel
											value={2}
											label="Quiero vender"
											control={ <Radio /> }
										/>
										<FormControlLabel
											value={1}
											label="Quiero comprar"
											control={ <Radio /> }
										/>
									</RadioGroup>
									<ErrorMessage
										name="role"
										className={styles.error}
									/>

								</FormControl>
							</Grid>
							<Grid item xs={12} mt={4} textAlign='center'>
									<CButton
										type="submit"
										title="Crear usuario"
										sx={{fontSize: '1.2rem'}}
									/>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default FormUser;
