import React, {useState} from "react";

import {Grid, InputAdornment, TextField, Typography} from "@material-ui/core";

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import {Link} from "react-router-dom";

import {SignInButton} from "../UI/Buttons";
import Logo from "../UI/Logo";

import MaskedInput from 'react-text-mask';

const CreateAccount = props =>
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
						<Typography variant={"h5"} align={"center"}>Create Account</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>Give us a few details, and you will be on your way.</Typography>
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const createAccount = () =>
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
					email={email} setEmail={setEmail}
					password={password} setPassword={setPassword}
					createAccount={createAccount} {...props}
				/>
			</Grid>
			<Grid item>
				<SignInButton onClick={() => createAccount()}>
					Create Account
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
							if(e.key === 'Enter') props.createAccount();
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
