import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Icon, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import useSnackbar from '../../../hooks/useSnackbar';
import styles from './UploadImg.module.scss';
import { AddAPhotoOutlined, EditOutlined } from '@mui/icons-material';
import CIconButton from '../Button/CIconButton';
import CButton from '../Button/CButton';

const UploadImg = function({
	updateImg,
	type,
	isEdit,
	title,
	subtitle
}) {

	console.log(isEdit)

	const [selectedImg, setSelectedImg] = useState();
	const setSnackbar = useSnackbar();

	useEffect(() => {
		console.log(selectedImg)
	}, [selectedImg])

	const onDrop = useCallback((acceptedFile) => {
		if(acceptedFile.length === 0) {
			setSnackbar('Solo podés cargar una(1) imagen');
			return;
		}
		setSelectedImg(acceptedFile[0]);
		updateImg(acceptedFile[0]);
	}, []);
	
	const {
		getRootProps,
		getInputProps
	} = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			// 'image/svg+xml': ['.svg']
		},
		maxFiles: 1
	});

	return (
		<Grid {...getRootProps()}>
			<input {...getInputProps()}/>
			{!selectedImg ? (
				<>
				{type === 'text' && (
					<>
					<Box className={styles.btncontainer}>
						{/* <Typography 
						  variant='button'
							className={styles.btn}>
								{title}
						</Typography> */}
						{/* <Icon><AddAPhotoOutlined /></Icon> */}
					<CButton
					  endIcon={<AddAPhotoOutlined color='error'/>}
						title={title}
						variant='text'
						sx={{fontSize: '1.2rem', opacity: '0.7', textAlig: 'right'}}
					/>
					<Typography 
					  variant='caption'>
							{subtitle}
					</Typography>
					</Box>
					</>
				)}
				{type === 'icon' && (
					<CIconButton 
					  icon={<AddAPhotoOutlined />}
						title="cambiar imagen"
					/>
				)}
				</>

			):(
				<Box className={styles.selectedimgcontainer}>
					{isEdit ? (
						<Box className={styles.iseditcontainer}>
							<img 
							  src={URL.createObjectURL(selectedImg)}
								alt="imagen"
							/>
					</Box>
					):(
						<Box className={styles.isnoteditcontainer}>
							<img
							  src={URL.createObjectURL(selectedImg)}
								alt="imagen"
							/>
						</Box>
					)}
					<CIconButton 
					  icon={<AddAPhotoOutlined />}
						title="cambiar imagen"
					/>
				</Box>
			)}
		</Grid>
	);
};

UploadImg.propTypes = {
	updateImg: PropTypes.func.isRequired,
	img: PropTypes.objectOf(PropTypes.any),
	type: PropTypes.oneOf(['icon', 'text']),
	title: PropTypes.string,
	subtitle: PropTypes.string
};

UploadImg.defaultProps = {
	img: null,
	type: 'text',
	title: 'agregar imagen',
	subtitle: null
};

export default UploadImg;