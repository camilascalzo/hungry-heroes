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

const editBusiness = (id, body, accountId) => {
	let urlService = apiUrl.getUrlService('business.editBusiness');
	urlService = urlService.replace(':id', id);
	
	const bodyAfter = {	...body };
	bodyAfter.email = null;
	bodyAfter.accountId = parseInt(accountId);
	bodyAfter.postalCode = parseInt(body.postalCode);
	return api.put(urlService, bodyAfter);
	
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getBusinesses,
	getBusinessById,
	editBusiness
};