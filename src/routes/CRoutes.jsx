import React from 'react';
import ROUTES_ENUM from '../enums/routesEnum';
import { Box } from '@mui/material';
import { createBrowserRouter, Outlet, RouterProvider, useNavigation } from 'react-router-dom';
import RequireAuth from '../components/common/RequireAuth';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import BusinessPage from '../pages/BusinessPage';
import RequestPassPage from '../pages/RequestPassPage';
import RequestPassConfirmationPage from '../pages/RequestPassConfirmationPage';
import Header from '../components/layout/Header/Header';
import BoxPage from '../pages/BoxPage';
import ChangePassPage from '../pages/ChangePassPage';
import ChangePassConfirmationPage from '../pages/ChangePassConfirmationPage';
import CreateUserPage from '../pages/CreateUserPage';
import CreateUserConfirmationPage from '../pages/CreateUserConfirmationPage';
import ProfileBusinessPage from '../pages/ProfileBusinessPage';
import SalesPage from '../pages/SalesPage';
import RemoveAccountPage from '../pages/RemoveAccountPage';
import AboutPage from '../pages/AboutPage';
import ResetPassPage from '../pages/ResetPassPage';
import BoxPageForClient from '../pages/BoxPageForClient';
// import environments from '../api/environments';
import Spinner from '../components/layout/Spinner/Spinner';
import VerifyRegistrationTokenPage from '../pages/VerifyRegistrationTokenPage';

// const { IS_DEVELOPMENT } = environments;

function Layout() {
	const navigation = useNavigation();
	return(
		<Box sx={{boxSizing: 'border-box'}}>
			<Header /> 
			<main>
				<Spinner open={navigation.state === 'loading'} />
				<Outlet />
			</main>
		</Box>
	);
}

const CRoutes = function () {
	const router = createBrowserRouter(
		[
			{
				path: ROUTES_ENUM.AUTH_LOGIN,
				element: <LoginPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.AUTH_REQUEST_PASS,
				element: <RequestPassPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.AUTH_REQUEST_PASS_CONFIRMATION,
				element: <RequestPassConfirmationPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.AUTH_RESET_PASS,
				element: <ResetPassPage/>,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.ABOUT,
				element:<AboutPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.CREATE_ACCOUNT,
				element: <CreateUserPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.CREATE_ACCOUNT_CONFIRMATION,
				element: <CreateUserConfirmationPage />,
				errorElement: <ErrorPage />
			},
			{
				path: ROUTES_ENUM.VERIFY_REGISTRATION_TOKEN,
				element: <VerifyRegistrationTokenPage />,
				errorElement: <ErrorPage />
			},
			{
				path: '/',
				element: <RequireAuth><Layout /></RequireAuth>,
				// element: <Layout />,
				errorElement: <ErrorPage />,
				children: [
					{
						path: ROUTES_ENUM.BUSINESS,
						element: <BusinessPage />
					},
					{
						path: ROUTES_ENUM.BOXES,
						element: <BoxPage />
					},
					{
						path: ROUTES_ENUM.BOXES_FOR_CLIENT,
						element: <BoxPageForClient />
					},
					{
						path: ROUTES_ENUM.AUTH_CHANGE_PASS,
						element: <ChangePassPage />
					},
					{
						path: ROUTES_ENUM.PROFILE,
						element: <ProfileBusinessPage />
					},
					{
						path: ROUTES_ENUM.SALES,
						element: <SalesPage />
					},
					{
						path: ROUTES_ENUM.REMOVE_ACCOUNT,
						element: <RemoveAccountPage />
					},
					{
						path: ROUTES_ENUM.AUTH_CHANGE_PASS,
						element: <ChangePassPage />
					},
					{
						path: ROUTES_ENUM.AUTH_CHANGE_PASS_CONFIRMATION,
						element: <ChangePassConfirmationPage />
					},
				]
			},
			{ path: '*', element: <ErrorPage /> }
		]
	);
	return <RouterProvider router={router}/>;
};

export default CRoutes;
