import API_BASE_URL from './environments';
const API = 'https://hungry-heroes.azurewebsites.net';
const apiUrl = {
	auth: {
		login: `${API}/Accounts/login`,
		register: `${API}/Accounts/register`,
		requestPass: `${API}/Accounts/forgot-password`,
		deleteAccount: `${API}/Accounts/:id`,
		changePassword: `${API}/Accounts/change-password`
	},
	business: {
		getBusinesses: `${API}/Business/All`,
		getBusinessById: `${API}/Business/:id`,
		editBusiness: `${API}/Business/:id`,
	},
	product: {
		getProductsByBusinessId: `${API}/Product/AllByBusiness/:id`,
		createProduct: `${API}/Product`,
		editProduct: `${API}/Product/:id`,
		deleteProduct: `${API}/Product/:id`
	}
};

const getUrlService = (apiService) => {
	const serviceUrlSplit = apiService.split('.');
	const serviceUrl = apiUrl[serviceUrlSplit[0]][serviceUrlSplit[1]];
	return serviceUrl;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getUrlService,
	apiUrl
};