import React, {createContext, useContext} from 'react';

import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

import Home from "./Index/Home";

import LoginLayout from "./Login/Layout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import ForgotPassword from "./Login/ForgotPassword";

import AppLayout from "./App/AppLayout";
import DashBoard from "./App/Dashboard/Dashboard";
import Profile from "./App/Profile/Profile";
import Collection from "./App/Collection/Collection";
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

const FilterRoutes = props => {
	let { path } = useRouteMatch()

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

const AppRoutes = props =>
{
	let { path } = useRouteMatch();
	return(
		<Switch>
			<Route exact path={path}>
				<Redirect to={{ pathname: `${path}/dashboard`, state: { from: props.location }}}/>
			</Route>
			<Route path={`${path}/dashboard`}>
				<AppLayout>
					<DashBoard {...props} />
				</AppLayout>
			</Route>
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
			<Route path={`${path}/collection`}>
				<AppLayout>
					<Collection {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/shop`}>
				<AppLayout>
					<Matches {...props} />
				</AppLayout>
			</Route>
			<Route>
				<NotFound {...props}/>
			</Route>
		</Switch>
	)
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
		setLoggedIn: (value) => authData.loggedIn = value,
		webSocket: null,
		setWebSocket: (value) => authData.webSocket = value
	}

	/*useEffect(() =>
{
if (!userData) return null;

let token = userData.token;
let username = userData.profile.username;
let credentials = 'username=' + username + '&token=' + token;
let proto = (location.protocol === 'https:') ? 'wss' : 'ws';
let port = (location.hostname === 'localhost') ? ':8000' : '';
let url = proto + '://' + window.location.hostname + port + '/ws?' + credentials;

webSocket.current = new WebSocket(url);
webSocket.current.onopen = () => console.log('WebSocket Connected');
webSocket.current.onmessage = wsReceive;
webSocket.current.onclose = () => console.log('WebSocket Closed');
webSocket.current.onerror = (error) => console.error(error);

return () => webSocket.current.close();
	}, [userData]);

const webSocketSend = (message) => webSocket.current.send(message);

const wsReceive = (message) =>
{
switch(message.data.type)
		{
case 'board':
break;

case 'create':
break;

case 'nickname':
break;

default:
break;
		}
	}
*/
	return (
		<AuthContext.Provider value={authData}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default Router;
