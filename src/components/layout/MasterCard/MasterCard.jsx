import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Typography } from '@mui/material';
import CButton from '../../ui/Button/CButton';
import logo from '../../../media/logo.png';
import styles from './MasterCard.module.scss';

const 
MasterCard = ({ headerTitle, headerSubtitle, children, footerBtnTitle, footerBtnIcon, onClick, logoComponent, footerComponent }) => {
	return(
		<Box className={styles.container}>
		<Card className={styles.card}>
			{logoComponent && (
				<Box className={styles.logocontainer}>
					<Box
						component="img"
						src={logo}
						alt= "Logo de Hungry Heroes"
					/>
				</Box>
			)}
			<Typography className={styles.headerTitle}>{headerTitle}</Typography>
			<Typography mt={1} className={styles.headersubtitle}>
				{headerSubtitle}
			</Typography>
			<Box my={6}>
				{children}
			</Box>
			{footerComponent && (
				<Box className={styles.btncontainer}>
					<CButton 
						variant="text"
						title={footerBtnTitle}
						startIcon={footerBtnIcon}
						// sx={{fontSize: '1rem'}}
						onClick={onClick}
					/>
				</Box>
			)}
		</Card>
		</Box>
	);
};

MasterCard.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	children: PropTypes.any,
	logoComponent: PropTypes.bool,
	footerComponent: PropTypes.bool,
	footerBtnTitle: PropTypes.string.isRequired,
	footerBtnIcon: PropTypes.node,
};

MasterCard.defaultProps = {
	subtitle: null,
	children: null,
	logoComponent: false,
	footerComponent: null
};

export default MasterCard;