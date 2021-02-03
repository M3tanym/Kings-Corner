import React from 'react';

import {Button, Hidden, Grid} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
	({
		signIn: {
			width: 250,
			height: 50,
			borderRadius: 200,
			fontSize: 22,
			color: "white",
			backgroundColor: grey[600],
			boxShadow: 'none',
			textTransform: 'none',
			'&:hover': {
				backgroundColor: grey[700],
				boxShadow: 'none',
			}
		},
		OAuth: {
			backgroundColor: "#FFFFFF",
			boxShadow: 'none',
			textTransform: 'none',
			'&:hover': {
				backgroundColor: "#FFFFFF",
				boxShadow: 'none',
			}
		},
	}));

export const SignInButton = props =>
{
	const classes = useStyles();

	return (
		<Button className={classes.signIn} {...props}>
			{props.children}
		</Button>
	);
}

export const OAuthButton = props =>
{
	const classes = useStyles();

	return (
		<Button className={classes.OAuth} {...props}>
			<Grid container spacing={2}
				  justify={"center"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					{props.icon}
				</Grid>
				<Hidden smDown>
					<Grid item>
						{props.children}
					</Grid>
				</Hidden>
			</Grid>
		</Button>
	);
}
