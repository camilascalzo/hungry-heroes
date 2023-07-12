const ROUTES_ENUM = Object.freeze({
	// no auth required
	AUTH_LOGIN: '/login',
	CREATE_ACCOUNT: '/Accounts/register',
	CREATE_ACCOUNT_CONFIRMATION: '/create-account-confirmation',
	AUTH_REQUEST_PASS: '/Accounts/forgot-password',
	AUTH_REQUEST_PASS_CONFIRMATION: '/request-password-confirmation',
	AUTH_RESET_PASS: '/Accounts/reset-password?token=:token',
	ABOUT: '/about',
	VERIFY_REGISTRATION_TOKEN: 'Accounts/verify-email', // ?token=:token

	// auth required
	AUTH_CHANGE_PASS: '/change-password',
	AUTH_CHANGE_PASS_CONFIRMATION: '/change-password-confirmation',
	REMOVE_ACCOUNT: '/remove-account',
	BUSINESS: '/business',
	PROFILE: '/profile',
	BOXES: '/boxes',
	BOXES_FOR_CLIENT:'/businessboxes',
	SALES: '/sales',
	
	AUTH_EMAIL_SENT: '/emailsent',
});

// const ROUTES_KEY_ENUM = Object.freeze({
// 	BUSINESS: 'BUSINESS',
// 	BOXES: 'BOXES',
// 	PROFILE: 'PROFILE',
// 	CHANGE_PASSWORD: 'AUTH_CHANGE_PASS',
// 	LOGOUT: 'AUTH_LOGIN',
// 	SALES: 'SALES',
// 	REMOVE_ACCOUNT: 'REMOVE_ACCOUNT'
// });

// export { ROUTES_KEY_ENUM };

export default ROUTES_ENUM;