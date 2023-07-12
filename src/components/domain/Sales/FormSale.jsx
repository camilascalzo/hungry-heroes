import React from "react";
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from "@mui/material";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CTextField from "../../ui/form/CTextField";
import FORMIK_PROPTYPES from "../../../modelsFormik/FormikProps";

const FormSale = function({
	onSubmit,
	formikRef
}) {

	const VALIDATION = Yup.object().shape({
		cardNumber: Yup.string().matches(/^\d{16}$/, 'Ingresar 16 números').required('Campo obligatorio'),
		cardHolder: Yup.string().matches(/^[a-zA-Z ]*$/, 'Ingresar solo letras sin tildes').required('Campo obligatorio'),
		expirationDate: Yup.string()
  .required('Campo obligatorio')
  .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Ingresar mm/aa'),
	cvv: Yup.string().matches(/^\d{3}$/, 'Ingresar 3 números').required('Campo obligatorio')
	});

	return(
		<Formik
		initialValues= {{
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvv: '',
    }}
		validationSchema={VALIDATION}
		onSubmit={onSubmit}
		innerRef={formikRef}
		validateOnMount
		>
			{(formik) => (
				<Form>
          <Box>
						<Typography variant="h5" textAlign='center' mb={6}>Ingresá los datos de tu tarjeta</Typography>
						<Grid container rowSpacing={2} columnSpacing={6} mb={6}>
							<Grid item xs={12}>
								<CTextField
									fullWidth
									name="cardNumber"
									label="Número de tarjeta"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12}>
								<CTextField
									fullWidth
									name="cardHolder"
									label="Titular"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<CTextField
									fullWidth
									name="expirationDate"
									label="Expiración (mm/aa)"
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<CTextField
									fullWidth
									name="cvv"
									label="Código de seguridad"
									formik={formik}
								/>
							</Grid>
						</Grid>
      		</Box>
				</Form>
			)}
		</Formik>
	);
};

FormSale.propTypes = {
  formikRef: PropTypes.objectOf(FORMIK_PROPTYPES).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default FormSale;