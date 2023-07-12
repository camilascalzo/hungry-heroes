import api from "../api/api";
import apiUrl from "../api/apiUrl";

const verifyAccount = (token) => {
	let urlService = apiUrl.getUrlService('auth.verifyRegistrationToken');
	urlService = urlService.replace(':token', token);

	return api.post(urlService);
}

const login = (body) => {
	const urlService = apiUrl.getUrlService('auth.login');
	return api.post(urlService, body);
};

const logout = () => {
	localStorage.clear();
};

const register = (body) => {
	const bodyAfter = {...body};
	bodyAfter.role = parseInt(body.role);
  const urlService = apiUrl.getUrlService('auth.register');
	return api.post(urlService, bodyAfter)
	.then(() => {
		localStorage.setItem('storedEmail', bodyAfter.email);
	})
	.catch((error) => {
		console.log(error)
	})
};

const requestPass = (email) => {
	const urlService = apiUrl.getUrlService('auth.requestPass');
	const UriParameters = new URLSearchParams();
	let url;

	UriParameters.append('email', email);

	if(UriParameters.entries().next().done === false) {
		url = urlService.concat(`?${UriParameters.toString()}`);
	}
	return api.post(url, {email})
	.then((response) => {
		localStorage.setItem('storedEmail', email);
		return response;
	})
	.catch((error) => {
		return error
	});
};

const changePassword = (id, body) => {
	const bodyAfter = {...body};
	bodyAfter.email = null;
	bodyAfter.id = parseInt(id);
	const urlService = apiUrl.getUrlService('auth.changePassword');
	return api.post(urlService, bodyAfter);
};

const restorePass = (body) => {
	const urlService = apiUrl.getUrlService('auth.restorePass');
	return api.post(urlService, body);
};

const deleteAccount = (id) => {
	const idAfter = parseInt(id);
	let urlService = apiUrl.getUrlService('auth.deleteAccount');
	urlService = urlService.replace(':id', idAfter);
	return api.delete(urlService);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	login,
	logout,
	register,
	restorePass,
	requestPass,
	changePassword,
	deleteAccount,
	verifyAccount
};
