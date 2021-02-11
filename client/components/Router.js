import React, {createContext, useContext} from 'react';

import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

import Home from "./Index/Home";

import LoginLayout from "./Login/Layout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import ForgotPassword from "./Login/ForgotPassword";

import AppLayout from "./App/AppLayout";
import DashBoard from "./App/Dashboard";
import Profile from "./App/Profile";
import Collection from "./App/Collection";
import Matches from "./App/Matches/Matches";
import Match from './App/Matches/Match';

import NotFound from "./NotFound";

export const AuthContext = createContext();

const Router = props =>
{
	return (
		<AuthNeeded>
			<BrowserRouter>
				<Routes {...props}/>
			</BrowserRouter>
		</AuthNeeded>
	);
};

const Routes = props =>
{

	return(
		<Switch>
			<Route exact path={"/"}>
				<Home />
			</Route>
			<Route path={"/login"}>
				<FilterRoutes route={"/login"}{...props}>
					<LoginLayout>
						<Login {...props}/>
					</LoginLayout>
				</FilterRoutes>
			</Route>
			<Route path={"/create-account"}>
				<FilterRoutes route={"/create-account"}{...props}>
					<LoginLayout>
						<CreateAccount {...props}/>
					</LoginLayout>
				</FilterRoutes>
			</Route>
			<Route path={"/forgot-password"}>
				<FilterRoutes route={"/login"}{...props}>
					<LoginLayout>
						<ForgotPassword {...props}/>
					</LoginLayout>
				</FilterRoutes>
			</Route>
			<ProtectedRoute path={"/app"}>
				<AppRoutes {...props}/>
			</ProtectedRoute>
			<Route path={"*"}>
				<NotFound {...props}/>
			</Route>
		</Switch>
	)
}

const AppRoutes = props =>
{
	let { path } = useRouteMatch();
	return(
		<Switch>
			<Route exact path={path}>
				<Redirect to={{ pathname: `${path}/dashboard`, state: { from: props.location }}}/>
			</Route>
			<FilterRoutes route={"/me"}{...props}>
				<AppLayout>
					<Profile />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes route={"/dashboard"} {...props}>
				<AppLayout>
					<DashBoard {...props} />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes route={"/collection"} {...props}>
				<AppLayout>
					<Collection {...props} />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes route={"/shop"} {...props}>
				<AppLayout>
					<Profile />
				</AppLayout>
			</FilterRoutes>
			<MatchRoutes />
			<Route path={"*"}>
				<NotFound {...props}/>
			</Route>
		</Switch>
	)
}

const MatchRoutes = props =>
{
	const { path } = useRouteMatch()

	return(
		<Switch>
			<Route exact path={`${path}/matches`}>
				<AppLayout>
					<Matches {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/matches/:matchID`}>
				<AppLayout>
					<Match {...props} />
				</AppLayout>
			</Route>
		</Switch>
	)
}

const FilterRoutes = props => {

	const { path } = useRouteMatch()

	return(
		<Switch>
			<Route exact path={path}>
				{props.children}
			</Route>
			<Route path={`*`}>
				<Redirect to={{ pathname: props.route, state: { from: props.location }}}/>
			</Route>
		</Switch>
	);
}

const ProtectedRoute = props => {

	let authData = useContext(AuthContext);
	return (
		<Route {...props}>
			{
				authData.loggedIn ? props.children :
					<Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
			}
		</Route>
	);
}

const AuthNeeded = props =>
{
	const authData = {
		userData: null,
		setUserData: (value) => authData.userData = value,
		loggedIn: false,
		setLoggedIn: (value) => authData.loggedIn = value
	}

	return (
		<AuthContext.Provider value={authData}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default Router;
