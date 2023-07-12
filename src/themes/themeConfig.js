import { createTheme } from '@mui/material/styles';
import vars from '../styles/variables.scss';

const theme = createTheme ( {
	palette: {
		primary: {
			main: vars.dark,
			contrastText: vars.secondary
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
	// TODO CS ver cómo cambiar independizar h tags de su size (creo que con mapping de material)
  // REFERENCIA VARIANTS MATERIAL
  // h1 96px
  // h2 60px -light 300
  // h3 48px - normal 400
  // h4 34px - normal 400
  // h5 24px - normal 400 (abajo cambio)
  // h6 20px - medium 500
  // subtitle1 16px - normal 400 (abajo cambio del weight)
  // subtitle2 14px - medium 500
  // body1 16px - normal 400
  // body2 14px - normal 400
  // button 14px - medium 500
  // caption 12px - normal 400 (abajo cambio del weight)
  // overline 10px - normal 400
  typography: {
    subtitle1: {
      fontWeight: 700
    },
    caption: {
      fontWeight: 700
    },
    button: {
      textTransform: 'lowercase',
			letterSpacing: '-0.5px',
			fontWeight: 900,
    },
		h5: {
			fontWeight: 900,
			textTransform: 'lowercase',
			letterSpacing: '-0.5px',
			fontSize: '1.1rem'
		}
  },
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '0'
				}
			}
		},
		// style for autocomplete in main.scss
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					'& .MuiAutocomplete-clearIndicator': {
						display: 'none'
					}
				},
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontWeight: '900',
					textTransform: 'lowercase'
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontWeight: '900',
					fontSize: '1.2rem',
					textTransform: 'lowercase',
					letterSpacing: '-1px'
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					textTransform: 'lowercase',
					letterSpacing: '-0.5px',
					fontWeight: '900'
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'& > *': {
						fontWeight: '900 !important',
						color: vars.secondary,
						fontSize: '1.2rem !important',
						letterSpacing: '-0.5px',
						backgroundColor: 'transparent'
					}
				}
			}
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: vars.blue,
					color: vars.secondary,
					fontSize: '1.1rem',
					fontWeight: '900',
					textTransform: 'lowercase',
					letterSpacing: '-1px',
					borderRadius: '0'
				}
			}
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					fontWeight: '900',
					fontSize: '1.2rem'
				}
			}
		},
		MuiList: {
			styleOverrides: {
				root: {
					backgroundColor: vars.primary,
					'& > *' :{
						fontWeight: '900 !important',
						fontSize: '1.2rem !important'
					}
				}
			}
		}
	}
});

export default theme;

