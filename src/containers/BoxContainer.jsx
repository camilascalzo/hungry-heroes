import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES_ENUM from '../enums/routesEnum';
import { Box, Typography } from '@mui/material';
import BoxCard from '../components/ui/BoxCard/BoxCard';
import CDialog from '../components/ui/form/CDialog';
import CButton from '../components/ui/Button/CButton';
// import img from '../media/box-img-placeholder.png'
import FormBox from '../components/domain/Boxes/FormBox';
import styles from './BoxContainer.module.scss';
import ProductService from '../services/ProductService';
import useLoading from '../hooks/useLoading';
import BusinessService from '../services/BusinessService';
import useSnackbar from '../hooks/useSnackbar';

const BoxContainer = function () {
	const navigate = useNavigate();
	const formikRef = useRef();
	const setLoading = useLoading();
	const [openModalCreate, setOpenModalCreate] = useState(false);
	const [openModalEdit, setOpenModalEdit] = useState(false);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [box, setBox] = useState(null);
	const [boxName, setBoxName] = useState();
	const [boxes, setBoxes] = useState([]);
	const userType = localStorage.getItem('role');
	const businessId = localStorage.getItem('userBusinessId');
	const [activeProfile, setActiveProfile] = useState();
	const setSnackbar = useSnackbar();
	const [image, setImage] = useState();

	useEffect(() => {
		console.log("IMAGEN", image);
		console.log("BOX", box);
		console.log(boxes);
	}, [image, box, boxes])
	
	useEffect(() => {
		setLoading(true);
		ProductService.getProductsByBusinessId(businessId)
	.then((response) => {
		setBoxes(response)
		setLoading(false);
	})
	.catch((error) => {
   console.log(error.message)
	 setSnackbar({message: error.message, severity: 'error'});
	 setLoading(false);
	})
	},[]);

	//TODO pasar a un context
	useEffect(() => {
		BusinessService.getBusinessById(businessId)
		.then((response) => {
			setActiveProfile(response.activeProfile);
		})
		.catch((error) => {
			console.log(error);
		})
	}, [businessId, activeProfile]);

	const createBox = (values, image) => {
		setImage(image);
		setLoading(true);
		console.log(values, image)
		ProductService.createProduct(businessId, values, image)
		.then((response) => {
			setSnackbar({message: 'El box fue creado correctamente', severity: 'success'})
			setBoxes((prevBoxes) => [...prevBoxes, response]);
			setLoading(false);
			navigate(0);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
			setSnackbar({message: error.message, severity: 'error'});
		})
		setOpenModalCreate(false);
	};

	const handleEditBox = (box) => {
		setBox(box);
		setOpenModalEdit(true);
	};

	const editBox = (values, image) => {
		console.log("IMAGEN QUE SE MANDA AL SERVICIO", image);
		setLoading(true);
		ProductService.editProduct(businessId, values,image)
		.then(() => {
			setLoading(false);
			setSnackbar({message: 'El box fue editado correctamente', severity: 'success'})
			// navigate(0);
		})
		.catch((error) => {
			console.log(error)
			setSnackbar({message: error.message, severity: 'error'});
			setLoading(false);
		})
		setOpenModalEdit(false);
	};

	const handleDeleteBox = (box) => {
		console.log(box)
		setBox(box);
		setBoxName(box.name);
		setOpenModalDelete(true);
	};	

	const deleteBox = () => {
		setLoading(true);
		ProductService.deleteProduct(box.productId)
		.then(() => {
			setLoading(false);
			setSnackbar({message: 'El box fue eliminado correctamente', severity: 'success'})
			navigate(0);
		})
		.catch((error) => {
			console.log(error);
			setSnackbar({message: error.message, severity: 'error'});
			setLoading(false);
		})
		setOpenModalDelete(false);
	};

	return (
		<Box className={styles.container}>
			<Box className={styles.btnContainer}>
				<CButton
					title="Crear box"
					sx={{fontSize: '1.2rem'}}
					variant="contained"
					onClick={()=> {setOpenModalCreate(true)}}
				/>
			</Box>
			<Box className={styles.cardContainer}>
				{boxes.length === 0 ? (
					<Box className={styles.emptycontainer}>
						<Typography>
							Todavía no creaste ningún box
						</Typography>
						{!activeProfile && (
						<>
							<Typography mt={4} mb={2}>
								podés crear tu box haciendo clic en crear box, <br/> pero tené en cuenta que para que tu comercio sea habilitado para vender, deberás
							</Typography>
							<CButton 
							title="Completar tu perfil"
							onClick={() => navigate
							(ROUTES_ENUM.PROFILE)}
							/>
						</>
						)}
					</Box>
				) : (
				boxes.map((box) => (
					<BoxCard
					key={box.productId}
					title={box.name}
					alt={`Logo de ${box.name}`}
					img={`https://hungryheroesstorage.blob.core.windows.net/images/${box.imageUrl}`}
					//hay que definir cant de caracteres
					description={box.description}
					stock={box.stock}
					price={box.price}
					onEdit={() => handleEditBox(box)}
					onDelete={() => handleDeleteBox(box)}
					userType={userType}
					activeProfile={activeProfile}
					/>
				)))
				}
			</Box>
			<CDialog
				title="Crear"
				open={openModalCreate}
				closeModal={() => setOpenModalCreate(false)}
				btnDialogTitle="Guardar"
				formikRef={formikRef}
				btnDialogOnClick={{
					action: createBox
				}}
			>
				<FormBox
					onSubmit={createBox}
					formikRef={formikRef}
				/>
			</CDialog>
			<CDialog
				title="Eliminar"
				open={openModalDelete}
				closeModal={() => setOpenModalDelete(false)}
				btnDialogTitle="Eliminar"
				btnDialogOnClick={{
					action: () => deleteBox()
				}}
			>
				<Typography variant='h6'>
					¿Querés eliminar el box {boxName}?
				</Typography>
			</CDialog>
			<CDialog
				title="Editar"
				open={openModalEdit}
				closeModal={() => setOpenModalEdit(false)}
				btnDialogTitle="Guardar cambios"
				formikRef={formikRef}
				btnDialogOnClick={{
					action: editBox
				}}
			>
				<FormBox
					onSubmit={editBox}
					formikRef={formikRef}
					box={box}
				/>
			</CDialog>
		</Box>
	);
};

export default BoxContainer;
