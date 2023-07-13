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
	subtitle,
	disabled,
	noClick
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
			'image/svg+xml': ['.svg']
		},
		maxFiles: 1,
		disabled:disabled,
		noClick:noClick
	});

	return (
		<Grid {...getRootProps()} className={styles.container}>
			<input {...getInputProps()}/>
			{!selectedImg ? (
				<>
				{type === 'text' && (
					<>
					<Box className={styles.btncontainer}>
						<CButton
						  disabled={disabled}
							endIcon={<AddAPhotoOutlined color='error'/>}
							title={title}
							variant='text'
							sx={{fontSize: '0.8rem', opacity: '0.7', textAlig: 'right'}}
						/>
						<Typography className={styles.subtitle}>
								{subtitle}
						</Typography>
						<Typography variant='caption' className={styles.caption}>
							*jpg, jpeg, svg
						</Typography>
					</Box>
					</>
				)}
				{type === 'icon' && (
					<CIconButton 
					  disabled={disabled}
					  icon={<AddAPhotoOutlined className={styles.editbtn}/>}
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
					  disabled={disabled}
						disableFocusRipple
						disableRipple
					  icon={<AddAPhotoOutlined  className={styles.editbtn}/>}
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