import React, { useEffect, useState } from 'react';
// import salesList from '../../../sales.json';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Paper,Typography } from '@mui/material';
import CTextField from '../../ui/form/CTextField';
import styles from './Sales.module.scss';
import CButton from '../../ui/Button/CButton';
import SaleService from '../../../services/SaleService';
import { setSnackbar } from '../../../api/api';
import { formatDate, formatPrice } from '../../../utils/utils';

const Sales = function({
	userType,
	salesList
}) {

	// const [isDelivered, setIsDelivered] = useState();

	const VALIDATION = Yup.object().shape({
		code: Yup.number().typeError("solo números").required('Campo obligatorio'),
	});

	// TODO traer de sale
	const saleId=2;

	const onSubmit = (values) => {
		console.log(values)
		console.log(saleId)
		SaleService.verifySale(values.code, saleId)
		.then((response) => {
			console.log(response)
			setSnackbar("El código fue correstamente validado")
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return(
		<Box  className={styles.container}>
				<Typography className={styles.maintitle}>
					{userType === "Client" ? "Mis compras" : "Mis ventas"}
				</Typography>
				{salesList.length === 0 ? (
					<Box className={styles.emptysaleslist}>
						<Typography>aún no {userType === "Client" ? "realizaste compras" : "tenés ventas registradas"}</Typography>
					</Box>
				):(
				<Box className={styles.cardwrapper}>
					{salesList.map((sale) => (
					<Paper className={styles.card}>
						<Box className={styles.datacontainer}>
							<Typography className={styles.title}>Fecha</Typography>
							<Typography className={styles.text}>
							{formatDate(sale.dateSale)}
							</Typography>
						</Box>
						<Box className={styles.datacontainer}>
							<Typography className={styles.title}>Box</Typography>
							<Typography className={styles.text}>
								{sale.boxName} x {sale.quantity}
							</Typography>
						</Box>
						<Box className={styles.datacontainer}>
							<Typography className={styles.title}>Total</Typography>
							<Typography className={styles.text}>
								${formatPrice(sale.total)}
							</Typography>
						</Box>
						<Box>
							{userType === "Client" ? (
							<>
							<Box className={styles.datacontainer}>
								<Typography className={styles.title}>Comercio</Typography>
								<Typography className={styles.text}>
									{sale.fantasyName}
								</Typography>
								</Box>
							<Box className={styles.datacontainer}>
								<Typography className={styles.title}>Código de compra</Typography>
								<Typography className={styles.text}>
									<span className={styles.important}>{sale.code}</span>
								</Typography>
							</Box>
							</>
							) : (
								<>
								<Box className={styles.datacontainer}>
									<Typography className={styles.title}>Usuario</Typography>
									<Typography className={styles.text}>
										{sale.userClientEmail}
									</Typography>
								</Box>
								<Box className={styles.datacontainer}>
									<Formik
										initialValues={{
											code: sale.delivered ? sale.code : ''
										}}
										validationSchema={VALIDATION}
										onSubmit={onSubmit}
										// innerRef={formikRef}
									>
										{(formik) => (
											<Form>
												<Box className={styles.formikcontainer}>
													<CTextField
														name="code"
														label='Código'
														fullWidth= {false}
														formik={formik}
														className={styles.data}
														disabled={sale.delivered}
													/>
													{!sale.delivered && (
														<CButton
															title="Validar"
															onClick={formik.handleSubmit}
														/>
													)}	
												</Box>
											</Form>
										)}
									</Formik>
								</Box>
								</>
							)}
						</Box>
						<Box className={styles.state}>
							{sale.delivered ? (
								<Typography p="0 0.5rem" className={styles.statedelivered}>Entregado</Typography>
							): (
								<Typography p="0 0.5rem" className={styles.statepending}> Entrega Pendiente</Typography>
							)}
						</Box>
					</Paper>
					))}
				</Box>

				)}
		</Box>
	);
};

export default Sales;
