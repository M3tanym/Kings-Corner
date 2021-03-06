import React, {createContext, useContext} from 'react';

import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

import Home from "./Index/Home";

import LoginLayout from "./Login/Layout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import ForgotPassword from "./Login/ForgotPassword";

import AppLayout from "./App/AppLayout";

import DashBoard from "./App/Pages/Dashboard";
import Matches from "./App/Pages/Matches";
import Match from './App/Match/Match';
import BattlePass from "./App/Pages/BattlePass";
import Collection from "./App/Pages/Collection";
import Shop from "./App/Pages/Shop";

import Profile from "./App/Pages/Profile";
import NotFound from "./NotFound";

export const AuthContext = createContext();

const Router = props =>
{
	return (
		<AuthNeeded>
			<BrowserRouter>
				<Routes />
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
			<FilterRoutes path={"/login"}>
				<LoginLayout>
					<Login />
				</LoginLayout>
			</FilterRoutes>
			<FilterRoutes path={"/create-account"}>
				<LoginLayout>
					<CreateAccount />
				</LoginLayout>
			</FilterRoutes>
			<FilterRoutes path={"/forgot-password"}>
				<LoginLayout>
					<ForgotPassword />
				</LoginLayout>
			</FilterRoutes>
			<ProtectedRoute path={"/app"}>
				<AppRoutes />
			</ProtectedRoute>
			<Route path={"*"}>
				<NotFound />
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
			<FilterRoutes path={`${path}/me`}>
				<AppLayout>
					<Profile />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/dashboard`}>
				<AppLayout>
					<DashBoard />
				</AppLayout>
			</FilterRoutes>
			<MatchRoutes path={`${path}/matches`}/>
			<FilterRoutes path={`${path}/battle-pass`}>
				<AppLayout>
					<BattlePass />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/collection`}>
				<AppLayout>
					<Collection />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/shop`}>
				<AppLayout>
					<Shop />
				</AppLayout>
			</FilterRoutes>
			<Route path={"*"}>
				<NotFound />
			</Route>
		</Switch>
	)
}

const MatchRoutes = props =>
{
	return(
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					<AppLayout>
						<Matches {...props} />
					</AppLayout>
				</Route>
				<Route path={`${props.path}/:matchID`}>
					<AppLayout>
						<Match {...props} />
					</AppLayout>
				</Route>
			</Switch>
		</Route>
	)
}

const FilterRoutes = props => {

	return(
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					{props.children}
				</Route>
				<Route path={"*"}>
					<Redirect to={{ pathname: props.path, state: { from: props.location }}}/>
				</Route>
			</Switch>
		</Route>
	);
}

const ProtectedRoute = props => {

	let authData = useContext(AuthContext);
	return (
		<Route {...props}>
			{
				authData.playerID ? props.children :
					<Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
			}
		</Route>
	);
}

const AuthNeeded = props =>
{
	const authData = { playerID: undefined, sessionToken: undefined }

	return (
		<AuthContext.Provider value={authData}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default Router;
