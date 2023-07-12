import { useNavigate, Link } from 'react-router-dom';
import world from '../media/world-woman.png';
import logo from '../media/logo.png';
import { Box, Typography, Icon, CardMedia } from '@mui/material';
import { AttachMoney, Campaign, Instagram, LinkedIn, Mail, MailOutline, Public, Store, WhatsApp } from '@mui/icons-material';
import ROUTES_ENUM from '../enums/routesEnum';
import CIconButton from '../components/ui/Button/CIconButton';

import styles from './AboutContainer.module.scss';
import CButton from '../components/ui/Button/CButton';

const AboutContainer = function () {

	const navigate = useNavigate();

  return (
    <Box className={styles.container}>
			{/* <Box className={styles.header}>
				<CIconButton
					color="primary"
				>
					<Instagram/>
				</CIconButton>
				<CIconButton>
					<LinkedIn />
				</CIconButton>
			</Box> */}
			<Box>
				<Typography className={styles.header}>¿sabías que...</Typography>
			</Box>

			<Box className={styles.body}>
				<Box className={styles.cardcontainer}>
					<Box className={styles.cardswrapper}>
						<Box className={`${styles.card} ${styles.card1}`}>
							<Typography className={styles.text}>cada año se desechan<span>1600 millones de toneladas</span>de comida en buen estado en el mundo</Typography>
						</Box>
						<Box className={`${styles.card} ${styles.card2}`}>
						<Typography className={styles.text}>que representan el <span>31%</span>de la producción mundial</Typography>
						</Box>
						<Box className={`${styles.card} ${styles.card3}`}>
							<Typography className={styles.text}>y son responsables del<span>20%</span>de las emisiones de metano generadas por humanos</Typography>
						</Box>
						<Box className={`${styles.card} ${styles.card4}`}>
						<Typography  className={styles.text}><span>10%</span>del desperdicio se produce en América Latina</Typography>
					</Box>
					<Box className={`${styles.card} ${styles.card5}`}>
						<Typography  className={styles.text}>lo que equivale a<span>130 millones de toneladas</span>anuales</Typography>
					</Box>
					<Box className={`${styles.card} ${styles.card6}`}>
						<Typography  className={styles.text}><span>16 millones de toneladas</span>de comida desechan en Argentina cada año</Typography>
					</Box>
					<Box className={`${styles.card} ${styles.card7}`}>
						<Typography  className={styles.text}>y esto es el<span>12.5%</span>de la producción nacional
						</Typography>
					</Box>
					
					<Box className={`${styles.card} ${styles.card8}`}>
						<Typography className={styles.text}><span>9500 toneladas</span>anuales se descartan en la Ciudad de Buenos Aires</Typography>
					</Box>
					<Box className={`${styles.card} ${styles.card9}`}>
						<Typography className={styles.text}>el equivalente a<span>3kg</span>por persona por año</Typography>
					</Box>
					<Box className={`${styles.card} ${styles.card10}`}>
						<Typography className={styles.text}>que representan el<span>40%</span>del total de los residuos</Typography>
					</Box>
					</Box>
				</Box>
				<Box className={styles.videocontainer}>
					<Box className={styles.cardmediacontainer}>
						<CardMedia
							className={styles.cardmedia}
							component="iframe"
							src="https://www.youtube.com/embed/xJ_fFLgGHiU"					
						/>
					</Box>
				</Box>
				<Box className={styles.maintitle}>
					<Typography>¿querés ayudar?</Typography>
				</Box>
				<Box className={styles.main}>
					<Box className={styles.imgcontainer}>
						<img src={world} />
						</Box>
						
					<Box className={styles.commercial}>
						<Typography className={styles.commercialtitle}>registrate en <Link to={ROUTES_ENUM.CREATE_ACCOUNT} className={styles.link}>Hungry Heroes</Link></Typography>
						<Box className={styles.client}>
							<Box className={styles.bulletwrapper}>
								<Box className={styles.bullet}>
									<Icon>
										<AttachMoney />
									</Icon>
									<Typography className={styles.bullettext}>Comprá con <span>descuentos</span> de hasta el 60%</Typography>
								</Box>
								<Box className={styles.bullet}>
									<Icon>
										<Store />
									</Icon>
									<Typography className={styles.bullettext}>Ayudá con el excedente de tus lugares favoritos</Typography>
								</Box>
								<Box className={styles.bullet}>
									<Icon>
										<Public />
									</Icon >
									<Typography className={styles.bullettext}><span>Ayudá al planeta </span>reduciendo el desperdicio</Typography>
								</Box>
							</Box>
						</Box>
						<Box className={styles.business}>
							<Box className={styles.bulletwrapper}>
								<Box className={styles.bullet}>
									<Icon>
										<AttachMoney />
									</Icon>
									<Typography  className={styles.bullettext}>Transformá tu excedente en ganancias</Typography>
								</Box>
								<Box className={styles.bullet}>
									<Icon>
										<Campaign />
									</Icon>
									<Typography className={styles.bullettext}>Atraé <span>nuevos clientes</span> sin esfuerzo</Typography>
								</Box>
								<Box className={styles.bullet}>
									<Icon>
										<Public />
									</Icon>
									<Typography className={styles.bullettext}>Ayudá al planeta reduciendo el volumen tus residuos</Typography>
								</Box>
							</Box>
								<CButton
									title="Ingresá"
									onClick={() => navigate(ROUTES_ENUM.AUTH_LOGIN)}
									sx={{fontSize: '2rem', marginTop: '3rem'}}
								/>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className={styles.footer}>
			<Box className={styles.logo}>
					<img src={logo} alt="" />
				</Box>
				<Box className={styles.contact}>
					<CIconButton disableFocusRipple disableRipple>
						<Typography className={styles.text}>info@hungryheroes.com</Typography>
					</CIconButton>
					<CIconButton disableFocusRipple disableRipple>
						<Typography className={styles.text}>+54 911 1111 1111</Typography>
					</CIconButton>
				</Box>
				
				<Box className={styles.contact}>
					<CIconButton disableFocusRipple disableRipple>
						<Instagram fontSize='large' className={styles.social}/>
					</CIconButton>
					<CIconButton disableFocusRipple disableRipple>
						<LinkedIn fontSize='large' className={styles.social}/>
					</CIconButton>
				</Box>
			</Box>
    </Box>
  );
};

export default AboutContainer;
