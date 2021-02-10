import React, {createContext, useContext} from 'react';

import {BrowserRouter, Switch, Route, useHistory, Redirect, useRouteMatch} from 'react-router-dom';

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
	const history = useHistory();

	return(
		<Switch>
			<Route exact path={"/"}>
				<Home history={history}/>
			</Route>
			<Route path={"/login"}>
				<LoginLayout>
					<Login history={history} {...props}/>
				</LoginLayout>
			</Route>
			<Route path={"/create-account"}>
				<LoginLayout>
					<CreateAccount history={history} {...props}/>
				</LoginLayout>
			</Route>
			<Route path={"/forgot-password"}>
				<LoginLayout>
					<ForgotPassword history={history} {...props}/>
				</LoginLayout>
			</Route>
			<ProtectedRoute path={"/app"}>
				<AppRoutes history={history} {...props}/>
			</ProtectedRoute>
			<Route exact path={"*"}>
				<NotFound history={history} {...props}/>
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
			<Route path={`${path}/dashboard`}>
				<AppLayout {...props}>
					<DashBoard {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/matches`}>
				<AppLayout {...props}>
					<Matches {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/matches/:matchID`}>
				<AppLayout {...props}>
					<Match {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/collection`}>
				<AppLayout {...props}>
					<Collection {...props} />
				</AppLayout>
			</Route>
			<Route path={`${path}/shop`}>
				<AppLayout {...props}>
					<Matches {...props} />
				</AppLayout>
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
