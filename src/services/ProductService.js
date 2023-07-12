import api from "../api/api";
import apiUrl from "../api/apiUrl";

const getProductsByBusinessId = (id) => {
	let urlService = apiUrl.getUrlService('product.getProductsByBusinessId');
	urlService = urlService.replace(':id', id);

	return api.get(urlService);
};

const createProduct = (businessId, body, image) => {
	// const bodyAfter = { ...body };
	// bodyAfter.userBusinessId = parseInt(businessId);
	// bodyAfter.stock = parseInt(body.stock);
	// bodyAfter.price = parseInt(body.price);
	// bodyAfter.image = image;
	const urlService = apiUrl.getUrlService('product.createProduct');
	// console.log(bodyAfter);
	const formData = new FormData();
	formData.append('userBusinessId', parseInt(businessId));
	formData.append('name', body.name);
	formData.append('description', body.description);
	formData.append('stock', parseInt(body.stock));
	formData.append('price', parseInt(body.price));
	formData.append('image', image);
//  return api.post(urlService, bodyAfter);



return api.post(urlService, formData, {
	headers: {
		'Content-type': 'multipart/form-data'
	}
});
};

const editProduct = (businessId, body, image) => {
	let urlService = apiUrl.getUrlService('product.editProduct');
	urlService = urlService.replace(':id', body.productId);

	const formData = new FormData();
	formData.append('name', body.name);
	formData.append('UserBusinessId', businessId);
	formData.append('description', body.description);
	formData.append('stock', parseInt(body.stock));
	formData.append('price', parseInt(body.price));
	formData.append('image', image);
	console.log("FORM DATA PRODUCTO", formData);

	return api.put(urlService, formData, {
		headers: {
			'Content-type': 'multipart/form-data'
		}
	});
};

const deleteProduct = (id) => {
	let urlService = apiUrl.getUrlService('product.deleteProduct');
	urlService = urlService.replace(':id', id);

	return api.delete(urlService);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getProductsByBusinessId,
	createProduct,
	editProduct,
	deleteProduct
};

