import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import BoxCard from '../components/ui/BoxCard/BoxCard';
import CDialog from '../components/ui/form/CDialog';
import useLoading from '../hooks/useLoading';
import FormSale from '../components/domain/Sales/FormSale';
import SaleService from '../services/SaleService';
import useSnackbar from '../hooks/useSnackbar';
import styles from './BoxContainer.module.scss';
import ROUTES_ENUM from '../enums/routesEnum';
import ProductService from '../services/ProductService';

const BoxContainerForClient = function () {
	const navigate = useNavigate();
	const formikRef = useRef();
	const setLoading = useLoading();
	const [openModalBuy, setOpenModalBuy] = useState(false);
	const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
	const [box, setBox] = useState(null);
	const [quantity, setQuantity] = useState();
	const [saleDetail, setSaleDetail] = useState();

	const userType = localStorage.getItem('role');
	const userClientId = localStorage.getItem('userClientId');
	const location = useLocation();
	const boxes = location.state;
	const setSnackbar = useSnackbar();

	useEffect(() => {
		console.log(boxes);
	}, [boxes]);

	const handleBuyBox = (box, values) => {
		console.log(box, values)
		setLoading(true);
		setQuantity(values.quantity);
		setOpenModalBuy(true);
		setLoading(false);
		// SaleService.modifyStock(box.productId, values.quantity)
		// .then((response) => {
		// 	console.log(response);
		// 	setOpenModalBuy(true);
		// 	setLoading(false);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// 	setLoading(false);
		// 	setSnackbar({message: error.message, severity: 'error'});
		// })
	};

		const confirmPurchase= () => {
			console.log(box, quantity)
		  setLoading(true);
			SaleService.createSale(userClientId, box, quantity)
			.then((response) => {
				  SaleService.getSaleById(response)
					.then((response) => {
						console.log(response);
						setSaleDetail(response);
					})
					  .then(() => {
							setLoading(false);
					    setOpenPurchaseModal(true);
							console.log("llamando a getproducst")
							ProductService.getProductsByBusinessId(box.userBusinessId)
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								console.log(error)
							})
						})
						.catch((error) => {
							console.log(error);
							setSnackbar({message: error.message, severity: 'error'});
						})
					.catch((error) => {
						console.log(error);
						setSnackbar({message: error.message, severity: 'error'});
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
					onBuy={(values) => {
						setBox(box);
						handleBuyBox(box, values);
					}}
					formikRef={formikRef}
					/>
				))
				}
			</Box>
			<CDialog
			  title='¡Estás a solo un paso de comprar tu box!'
				open={openModalBuy}
				closeModal={() => setOpenModalBuy(false)}
				btnDialogTitle="Confirmar compra"
				btnDialogOnClick={{
					action: () => formikRef.current.submitForm(),

				}}
			>
				<FormSale
				  onSubmit={confirmPurchase}
				  // onSubmit={handleBuyBox}
					formikRef={formikRef}
				/>
			</CDialog>
			<CDialog
				title="¡compra confirmada!"
				open={openPurchaseModal}
				closeModal={() => setOpenPurchaseModal(false)}
				btnDialogTitle="Ver mis compras"
				// btnDialogOnClick={{
				// 	action: navigate(ROUTES_ENUM.SALES)
				// }}

			>
        <Box className={styles.saledetailcontainer}>
					<Typography textAlign='center' variant='h5'>
						Detalles de tu compra
					</Typography>
					<Box className={styles.datacontainer}>
						<Typography className={styles.saledata}>
							Comercio:<span> {saleDetail?.fantasyName || null }</span>
						</Typography>
						<Typography className={styles.saledata}>
							Box: <span>{saleDetail?.boxName || null }</span>
						</Typography>
						<Typography className={styles.saledata}>
							Cantidad: <span>{saleDetail?.quantity || null }</span>
						</Typography>
						<Typography className={styles.saledata}>
							Total: <span>{saleDetail?.total || null }</span>
						</Typography>
					</Box>
					<Typography className={styles.cta}> 
						Podés ver todas tus compras en <span>mis compras</span>
					</Typography>
					<Typography className={styles.ty}>
						<span>¡Gracias por ayudar al planeta!</span>
					</Typography>
				</Box>

			</CDialog>
		</Box>
	);
};

export default BoxContainerForClient;
