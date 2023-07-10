import api from "../api/api";
import apiUrl from "../api/apiUrl";

const createSale = (userClientId, body, quantity) => {
	const bodyAfter = { ...body };
	bodyAfter.userClientId = parseInt(userClientId);
	bodyAfter.quantity = quantity;
	bodyAfter.businessId = body.userBusinessId;
	bodyAfter.productId = body.productId;
	bodyAfter.description = null;
	bodyAfter.imageUrl = null;
	bodyAfter.name = null;
	bodyAfter.price = null;
	bodyAfter.stock = null;
	bodyAfter.userBusinessId = null;

	const urlService = apiUrl.getUrlService('sales.createSale');
	console.log(bodyAfter);
	return api.post(urlService, bodyAfter);
};

const getSaleById = (id) => {
	let urlService = apiUrl.getUrlService('sales.getSaleById');
	urlService = urlService.replace(':id', id);

	return api.get(urlService);
};

const modifyStock = (id, quantity) => {
	let urlService = apiUrl.getUrlService('sales.modifyStock');
	urlService = urlService.replace(':id', id);
	urlService = urlService.replace(':quantity', quantity);

	console.log(urlService);

	return api.put(urlService);
};

const verifySale = (code, id) => {
	let urlService = apiUrl.getUrlService('sales.verifySale');
	urlService = urlService.replace(':id', id);
	urlService = urlService.replace(':code', code);

	console.log(urlService)

	return api.put(urlService);
};

const getSalesByClientId = (id) => {
	let urlService = apiUrl.getUrlService('sales.getSalesByClientId');
	urlService = urlService.replace(':id', id);

	return api.get(urlService)
};

const getSalesByBusinessId = (id) => {
	let urlService = apiUrl.getUrlService('sales.getSalesByBusinessId');
	urlService = urlService.replace(':id', id);

	return api.get(urlService)
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	createSale,
	getSaleById,
	getSalesByBusinessId,
	getSalesByClientId,
	modifyStock,
	verifySale
}