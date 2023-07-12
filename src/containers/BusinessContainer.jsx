import React, { useEffect, useState } from 'react';
import businessList from '../business.json';
import { Box } from '@mui/material';
import BusinessCard from '../components/ui/BusinessCard/BusinessCard';
import logo from '../media/logo-placeholder.png';
import styles from './BusinessContainer.module.scss';
import BusinessService from '../services/BusinessService';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import ROUTES_ENUM from '../enums/routesEnum';
import useLoading from '../hooks/useLoading';
import useSnackbar from '../hooks/useSnackbar';

const BusinessContainer = function () {

	const [businesses, setBusinesses] = useState([]);
	const [businessId, setBusinessId] = useState();
	const navigate = useNavigate();
	const setLoading = useLoading();
	const setSnackbar = useSnackbar();

	const handleSelectBusiness = (id) => {
		setBusinessId(id);
		setLoading(true);
		ProductService.getProductsByBusinessId(id)
		.then((response) => {
			navigate(ROUTES_ENUM.BOXES_FOR_CLIENT, { state: response });
			setLoading(false);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
			setSnackbar({message: error.message, severity: 'error'});
		})
	}

	useEffect(() => {
		BusinessService.getBusinesses()
	.then((response) => {
		setBusinesses(response);
	})
	.catch((error) => {
		console.log(error)
		setSnackbar({message: error.message, severity: 'error'});
	})
	},[]);

	return (
		<Box className={styles.container} >
			<Box className={styles.cardContainer}>
				{businesses.map((business) => (
					<BusinessCard 
					title={business.fantasyName}
					subtitle={business.slogan}
					alt={`Logo de ${business.fantasyName}`}
					logo={`https://hungryheroesstorage.blob.core.windows.net/images/${business.imageUrl}`}
					// hay que definir cant de caracteres
					description={business.description}
					onSelect={() => handleSelectBusiness(business.userBusinessId)}
					/>
				))}
			</Box>
		</Box>
	);
};

export default BusinessContainer;
