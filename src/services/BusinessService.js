import api from "../api/api";
import apiUrl from "../api/apiUrl";

const getBusinesses = () => {
	const urlService = apiUrl.getUrlService('business.getBusinesses');
	return api.get(urlService);
};

const getBusinessById = (id) => {
	let urlService = apiUrl.getUrlService('business.getBusinessById');
	urlService = urlService.replace(':id', id);
	return api.get(urlService);
};

const editBusiness = (id, body, accountId, image) => {
	let urlService = apiUrl.getUrlService('business.editBusiness');
	urlService = urlService.replace(':id', id);

	const formData = new FormData();
	formData.append('accountId', parseInt(accountId));
	formData.append('email', null);
	formData.append('postalCode', parseInt(body.postalCode));
	formData.append('fantasyName', body.fantasyName);
	formData.append('businessName', body.businessName);
	formData.append('slogan', body.slogan);
	formData.append('description', body.description);
	formData.append('address', body.address);
	formData.append('location', body.location);
	formData.append('cuit', body.cuit);
	formData.append('alias', body.alias);
	formData.append('web', body.web);
	formData.append('image', image);
	console.log("IMAGEN QUE SE MANDA:", image)
	console.log(formData);
	return api.put(urlService, formData, {
		headers: {
			'Content-type': 'multipart/form-data'
		}
	});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getBusinesses,
	getBusinessById,
	editBusiness
};