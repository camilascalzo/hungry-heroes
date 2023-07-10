import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import BoxCard from '../components/ui/BoxCard/BoxCard';
import CDialog from '../components/ui/form/CDialog';
// import img from '../media/box-img-placeholder.png';
import styles from './BoxContainer.module.scss';
import useLoading from '../hooks/useLoading';
import FormSale from '../components/domain/Sales/FormSale';
import SaleService from '../services/SaleService';
import useSnackbar from '../hooks/useSnackbar';

const BoxContainerForClient = function () {
	const navigate = useNavigate();
	const formikRef = useRef();
	const setLoading = useLoading();
	const [openModalBuy, setOpenModalBuy] = useState(false);
	const [box, setBox] = useState(null);
	const [quantity, setQuantity] = useState();
	const userType = localStorage.getItem('role');
	const userClientId = localStorage.getItem('userClientId');
	const location = useLocation();
	const boxes = location.state;
	const setSnackbar = useSnackbar();

	useEffect(() => {
		console.log(boxes);
	}, [boxes]);


	const handleBuyBox = (values,box) => {
		setBox(box);
		setQuantity(values.quantity)
		console.log(box)
		console.log(values)
		// // borrar este set open modal
		// setOpenModalBuy(true);
		setLoading(true);
			SaleService.modifyStock(box.productId, quantity)
			.then((response) => {
				console.log(response);
				setOpenModalBuy(true);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				setSnackbar({message: error.message, severity: 'error'});
			})
	}

		const confirmPurchase = (values) => {
		  setLoading(true);
			SaleService.createSale(userClientId, box, quantity)
			.then((response) => {
				SaleService.getSaleById(response)
				.then((response) => {
					console.log(response);
					setLoading(false);
					//mostrar pantalla details compra -- modal??
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					setSnackbar({message: error.message, severity: 'error'})
				})
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				setSnackbar({message: error.message, severity: 'error'})
			})
		}

	return (
		<Box className={styles.container}>
			<Box className={styles.cardContainer}>
				{boxes.map((box) => (
					<BoxCard
					key={box.productId}
					title={box.name}
					alt={`Logo de ${box.name}`}
					img={`https://hungryheroesstorage.blob.core.windows.net/images/${box.imageUrl}`}
					//hay que definir cant de caracteres
					description={box.description}
					stock={box.stock}
					price={box.price}
					userType={userType}
					onBuy={(values) => handleBuyBox(values, box)}
					formikRef={formikRef}
					/>
				))
				}
			</Box>
			<CDialog
			  title='Ingresá los datos de tu tarjeta'
				open={openModalBuy}
				closeModal={() => setOpenModalBuy(false)}
				btnDialogTitle="Confirmar compra"
				btnDialogOnClick={{
					action: () => formikRef.current.submitForm(),

				}}
			>
				<FormSale
				  onSubmit={confirmPurchase}
					formikRef={formikRef}
				/>
			</CDialog>
		</Box>
	);
};

export default BoxContainerForClient;
