import React, {useContext, useState} from "react";

import {Link, useHistory, useLocation} from "react-router-dom";

import {CircularProgress, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {useMutation} from "@apollo/client";
import {CreateUser} from "../../graphql/mutation";

import {useSnackbar} from "notistack";

import {AuthContext} from "../Router";

import {SignInButton} from "../UI/Buttons";
import Logo from "../UI/Logo";

const CreateAccount = props =>
{
	const [pageOne, setPageOne] = useState(true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
				<Grid item container spacing={2}
					  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h5"} align={"center"}>Create Account</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>Give us a few details, and you will be on your way.</Typography>
					</Grid>
				</Grid>
				<Grid item style={{width: "90%"}}>
					{
						pageOne ?
							<SignInAreaPageOne
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								setPageOne={setPageOne}
							/> :
							<SignInAreaPageTwo
								email={email}
								password={password}
							/>
					}
				</Grid>
			</Grid>
			<Grid item>
				<BackToSignInArea />
			</Grid>
		</Grid>
	)
};

const SignInAreaPageOne = props =>
{
	return (
		<Grid container spacing={6}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item style={{width: "100%"}}>
				<PageOneFields
					email={props.email} setEmail={props.setEmail}
					password={props.password} setPassword={props.setPassword}
					nextField={() => props.setPageOne(false)}
				/>
			</Grid>
			<Grid item>
				<SignInButton onClick={() => props.setPageOne(false)}>
					Next
					<NavigateNextIcon />
				</SignInButton>
			</Grid>
		</Grid>
	)
}

const SignInAreaPageTwo = props =>
{
	const [inGameName, setInGameName] = useState("");

	let authData = useContext(AuthContext);

	let history = useHistory();
	let location = useLocation();

	const { enqueueSnackbar } = useSnackbar();

	const [doMutation, { loading }] = useMutation(CreateUser, {
		onCompleted: data => {
			authData.playerID = data.createUser.playerID;

			let { from } = location.state || { from: { pathname: "/app" } };
			history.replace(from);
		},
		onError: (err) => enqueueSnackbar(err)});

	const createUser = () => doMutation({
		variables: { email: props.email, password: props.password, inGameName }
	})

	return (
		<Grid container spacing={6}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item style={{width: "100%"}}>
				<TextField
					fullWidth
					label={"In Game Name"} value={inGameName} onChange={(e) => setInGameName(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.key === 'Enter') createUser();
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircleIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item>
				{
					loading ? <CircularProgress /> :
						<SignInButton onClick={createUser}>
							Create Account
						</SignInButton>
				}
			</Grid>
		</Grid>
	)
}

const PageOneFields = props =>
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
			<Grid item container spacing={3} style={{width: "90%"}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth
						label={"Email"} value={props.email} onChange={(e) => props.setEmail(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') moveDown(1);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth type={"password"} autoComplete={"current-password"}
						label={"Password"} value={props.password} onChange={(e) => props.setPassword(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') props.nextField();
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

const BackToSignInArea = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>Already have an account?</Typography>
			</Grid>
			<Grid item>
				<Link to={"/login"}>
					<Typography variant={"body2"} color={"primary"}>Sign In</Typography>
				</Link>
			</Grid>
		</Grid>
	)
}

export default CreateAccount;
