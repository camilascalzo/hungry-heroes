import { createTheme } from '@mui/material/styles';
import vars from '../styles/variables.scss';

const theme = createTheme ( {
	palette: {
		primary: {
			main: vars.primary,
			contrastText: vars.light
		},
		secondary: {
			main: vars.secondary,
			contrastText: vars.primary
		},
		disabled: {
			main: vars.disabled
		},
		error: {
			main: vars.error,
			contrastText: vars.light
		},
		warning: {
			main: vars.warning,
			contrastText: vars.light
		},
		info: {
			main: vars.info,
			contrastText: vars.light
		},
		success: {
			main: vars.success,
			contrastText: vars.light
		}
	},
	// TODO CS ver cómo cambiar independizar h tags de size (creo que con mapping de material)
  // REFERENCIA VARIANTS MATERIAL
  // h1 96px
  // h2 60px -light 300
  // h3 48px - normal 400
  // h4 34px - normal 400
  // h5 24px - normal 400
  // h6 20px - medium 500
  // subtitle1 16px - normal 400 (abajo cambio del weight)
  // subtitle2 14px - medium 500
  // body1 16px - normal 400
  // body2 14px - normal 400
  // button 14px - medium 500
  // caption 12px - normal 400 (abajo cambio del weight)
  // overline 10px - normal 400
  typography: {
    // htmlFontSize: 10, TODO CS solo si facu cambia size de variants
    subtitle1: {
      fontWeight: 700
    },
    caption: {
      fontWeight: 700
    },
    button: {
      textTransform: 'none'
    }
  },
});

export default theme;

