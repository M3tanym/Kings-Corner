import React, {useContext, useState} from "react";

import {Box, CircularProgress, Divider, Grid, TextField, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import {Link, useHistory, useLocation} from "react-router-dom";

import {OAuthButton, SignInButton} from "../UI/Buttons";
import Logo from "../UI/Logo";

import {GoogleLogin} from 'react-google-login';
const GoogleClientID = '779071993156-iec5nqbmgqr4t3524psqlbep08aasvrs.apps.googleusercontent.com';

import {AuthContext} from "../Router";
import {gql, useMutation} from '@apollo/client';

import {useSnackbar} from "notistack";

const Login = props =>
{
	return(

		<Grid container spacing={4}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Logo height={100}/>
			</Grid>
			<Grid item container spacing={4} style={{width: "100%"}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<Typography variant={"h5"} align={"center"}>Welcome to Kings Corner</Typography>
				</Grid>
				<Grid item style={{width: "100%"}}>
					<SignInArea {...props}/>
				</Grid>
				<Grid item style={{width: "90%"}}>
					<DividerArea />
				</Grid>
				<Grid item>
					<OAuthArea {...props}/>
				</Grid>
				<Grid item>
					<CreateAccountArea {...props}/>
				</Grid>
			</Grid>
		</Grid>
	)
};

const SignInArea = props =>
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	let authData = useContext(AuthContext);

	let history = useHistory();
	let location = useLocation();

	const { enqueueSnackbar } = useSnackbar();

	const Login = gql`
		mutation Login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				token
			}
		}
	`;

	const [doMutation, { loading }] = useMutation(Login);

	/*
	const login = () => doMutation({
		variables: { username, password },
		onCompleted: data => {
			authData.token = data.user.token;

			let { from } = location.state || { from: { pathname: "/app" } };
			history.replace(from);
		},
		onError: (err) => enqueueSnackbar(err)
	})
	 */

	const login = () => {
		authData.token = "Hello World";
		let { from } = location.state || { from: { pathname: "/app" } };
		history.replace(from);
	}

	return (
		<Grid container spacing={4}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item style={{width: "100%"}}>
				<LoginFields
					username={username} setUsername={setUsername}
					password={password} setPassword={setPassword}
					login={login} {...props}
				/>
			</Grid>
			<Grid item>
				{
					loading ? <CircularProgress /> :
						<SignInButton onClick={login}>
							Sign in
						</SignInButton>
				}
			</Grid>
		</Grid>
	)
}

const LoginFields = props =>
{
	const moveDown = (currentElement) =>
	{
		let input1 = document.getElementsByTagName("input")[currentElement + 1];
		input1.focus();
	};

	return(
		<Grid container spacing={1} style={{width: "100%", position: "relative"}}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item container spacing={3} style={{width: "90%", paddingBottom: 20}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth autoComplete={"username"} size={"medium"}
						label={"Username or Email"} value={props.username} onChange={(e) => props.setUsername(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') moveDown(0);
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth type={"password"} autoComplete={"current-password"}
						label={"Password"} value={props.password} onChange={(e) => props.setPassword(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') props.login();
						}}
					/>
				</Grid>
			</Grid>
			<Grid item style={{marginLeft: "auto"}}>
				<Link to={"/forgot-password"}>
					<Typography variant={"body2"} color={"primary"}>Forgot password?</Typography>
				</Link>
			</Grid>
		</Grid>
	);
}

const DividerArea = props =>
{
	return(
		<Grid container justify={"center"} alignItems={"center"} alignContent={"center"}
			  spacing={2}
		>
			<Grid item style={{width: "40%"}} align={"center"}>
				<Divider />
			</Grid>
			<Grid item align={"center"}>
				<Typography style={{color: grey[600]}}>or</Typography>
			</Grid>
			<Grid item style={{width: "40%"}} align={"center"}>
				<Divider />
			</Grid>
		</Grid>
	)
}

const OAuthArea = props =>
{
	return(
		<Grid container spacing={2}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<GoogleLogin
					clientId={GoogleClientID} cookiePolicy={'single_host_origin'} responseType={'token'}
					onFailure={err => props.produceSnackBar(err.details)}
					onSuccess={loginResponse => {
						post("login", {idTokenString: loginResponse.tokenObj.id_token})
							.then(r => {
								if (r.data.loginSuccess) {
									props.setUserData(response.data);
									props.setPage('dash');
								} else {
									props.produceSnackBar('Sign-In error!');
								}
							});
					}}
					render={props =>
						<OAuthButton onClick={props.onClick} disabled={props.disabled} icon={<GoogleIcon />}>
							Sign in with Apple
						</OAuthButton>
					}
				/>
			</Grid>
			<Grid item>
				<GoogleLogin
					clientId={GoogleClientID} cookiePolicy={'single_host_origin'} responseType={'token'}
					onFailure={err => props.produceSnackBar(err.details)}
					onSuccess={loginResponse => {
						post("/api/login", {idTokenString: loginResponse.tokenObj.id_token})
							.then(r => {
								if (r.data.loginSuccess) {
									props.setUserData(response.data);
									props.setPage('dash');
								} else {
									props.produceSnackBar('Sign-In error!');
								}
							});
					}}
					render={props =>
						<OAuthButton onClick={props.onClick} disabled={props.disabled} icon={<GoogleIcon />}>
							Sign in with Google
						</OAuthButton>
					}
				/>
			</Grid>
		</Grid>
	)
}

const GoogleIcon = props =>
{
	return (
		<Box style={{paddingTop: 6}}>
			<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
				<g fill="#000" fillRule="evenodd">
					<path
						d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
						fill="#EA4335"
					/>
					<path
						d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
						fill="#4285F4"/>
					<path
						d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
						fill="#FBBC05"
					/>
					<path
						d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
						fill="#34A853"
					/>
					<path fill="none" d="M0 0h18v18H0z"/>
				</g>
			</svg>
		</Box>
	)
}

const CreateAccountArea = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>New?</Typography>
			</Grid>
			<Grid item>
				<Link to={"/create-account"}>
					<Typography variant={"body2"} color={"primary"}>Create Account</Typography>
				</Link>
			</Grid>
		</Grid>
	)
}

export default Login;
