import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

const Spinner = function ({ open }) {
  return (
    <Backdrop
      open={open}
			sx={{zIndex:'200'}}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Spinner.propTypes = {
  open: PropTypes.bool.isRequired
};

export default Spinner;
