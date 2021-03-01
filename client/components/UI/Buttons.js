import React from 'react';

import {Button, Hidden, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

const useStyles = makeStyles(theme =>
	({
		bold: {
			width: 250,
			height: 50,
			borderRadius: 200,
			fontSize: 22,
			color: "white",
			boxShadow: 'none',
			textTransform: 'none',
			'&:hover': {
				boxShadow: 'none',
			}
		},
		signIn: {
			backgroundColor: theme.palette.primary.main,
			'&:hover': {
				backgroundColor: theme.palette.primary.main,
			}
		},
		download: {
			backgroundColor: theme.palette.secondary.main,
			'&:hover': {
				backgroundColor: theme.palette.secondary.main,
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

export const HomePageButton = props =>
{
	const classes = useStyles();

	return (
		<Button className={clsx(classes.bold, classes.download)} {...props}>
			{props.children}
		</Button>
	);
}

export const SignInButton = props =>
{
	const classes = useStyles();

	return (
		<Button className={clsx(classes.bold, classes.signIn)} {...props}>
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
