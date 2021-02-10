import React from 'react';

import {Button, Hidden, Grid} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
	({
		signIn: {
			width: 250,
			height: 50,
			borderRadius: 200,
			fontSize: 22,
			color: "white",
			backgroundColor: theme.palette.primary.main,
			boxShadow: 'none',
			textTransform: 'none',
			'&:hover': {
				backgroundColor: theme.palette.primary.main,
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
