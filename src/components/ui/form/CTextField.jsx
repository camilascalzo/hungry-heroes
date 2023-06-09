import React, { useState } from "react";
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import CIconButton from "../Button/CIconButton";
import FORMIK_PROPTYPES from "../../../modelsFormik/FormikProps";

const CTextField = function ({
  fullWidth,
	multiline,
	name,
  label,
  disabled,
  type,
  size,
	color,
  placeholder,
  autocomplete,
	variant,
  sx,
  InputProps,
	helperText,
	error,
	formik,
	position
}) {

  const [isPassVisible, setPassVisibility] = useState(false);
  
	const setPassFieldType = () => {
    if (isPassVisible) { 
			return 'text'; }
    return 'password';
  };
  
	const inputPropsPass = {
    endAdornment: (
      <InputAdornment position="end">
        <CIconButton
          disableRipple
          onClick={() => { 
						setPassVisibility(!isPassVisible); }}
        >
          {
            isPassVisible ? <VisibilityOutlined />
              : <VisibilityOffOutlined />
          }
        </CIconButton>
      </InputAdornment>
    )
  };

  return (
    <TextField
    fullWidth={fullWidth}
		multiline={multiline}
    name={name}
    label= {label}
		color={color}
    disabled={disabled}
    type={type === 'password' ? setPassFieldType() : type}
    size={size}
    placeholder={placeholder}
    autoComplete={autocomplete}
		variant={variant}
		value={formik.values[name]}
		onChange={(e) => (formik.handleChange(e))}
		onBlur={(e) => (formik.handleBlur(e))}
    InputProps={type === 'password' ? inputPropsPass : InputProps}
		sx={sx}
		helperText={(formik.touched[name] && formik.errors[name])}
		error={(formik.touched[name] && Boolean(formik.errors[name]))}
    />
  );
};

CTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  formik: PropTypes.shape(FORMIK_PROPTYPES),
  sx: PropTypes.objectOf(PropTypes.any),
  InputProps: PropTypes.objectOf(PropTypes.any),
	helperText: PropTypes.string,
	error: PropTypes.bool,
	variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
	fullWidth: PropTypes.bool,
	multiline: PropTypes.bool
};

CTextField.defaultProps = {
	color: 'primary',
	disabled: false,
	type: 'text',
	size: 'small',
	placeholder: null,
	autoComplete: 'off',
	formik: null,
	sx: null,
	InputProps: null,
	helperText: 'Error',
	error: false,
	variant: 'standard',
	fullWidth: true,
	multiline: false
};

export default CTextField;
