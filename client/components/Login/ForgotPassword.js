import React, {useState} from "react";

import {Grid, InputAdornment, TextField, Typography} from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';

import {Link} from "react-router-dom";

import {SignInButton} from "../UI/Buttons";
import Logo from "../UI/Logo";

import MaskedInput from 'react-text-mask';

const ForgotPassword = props =>
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
				<Grid item container spacing={2}
					  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h5"} align={"center"}>Forgot Password</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>Don't worry, it happens to the best of us.</Typography>
					</Grid>
				</Grid>
				<Grid item style={{width: "90%"}}>
					<SignInArea {...props}/>
				</Grid>
			</Grid>
			<Grid item>
				<BackToSignInArea {...props}/>
			</Grid>
		</Grid>
	)
};

const SignInArea = props =>
{
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const resetAccount = () =>
	{
		post("login", {username: username, password: password})
		.then(res =>
		{

		})
	};

	return (
		<Grid container spacing={6}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item style={{width: "100%"}}>
				<LoginFields
					username={username} setUsername={setUsername}
					phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
					resetAccount={resetAccount} {...props}
				/>
			</Grid>
			<Grid item>
				<SignInButton onClick={() => resetAccount()}>
					Reset Account
				</SignInButton>
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
			<Grid item container spacing={3} style={{width: "90%"}}
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
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircleIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth
						label={"Phone Number"} value={props.phoneNumber} onChange={(e) => props.setPhoneNumber(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') props.resetAccount();
						}}
						InputProps={{
							inputComponent: PhoneNumberInput,
							startAdornment: (
								<InputAdornment position="start">
									<PhoneIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

const PhoneNumberInput = props =>
{
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			ref={ref => inputRef(ref ? ref.inputElement : null)}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

const BackToSignInArea = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>Suddenly Remember?</Typography>
			</Grid>
			<Grid item>
				<Link to={"/login"}>
					<Typography variant={"body2"} color={"primary"}>Sign In</Typography>
				</Link>
			</Grid>
		</Grid>
	)
}

export default ForgotPassword;
