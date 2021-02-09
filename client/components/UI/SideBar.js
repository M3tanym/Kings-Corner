import React from "react";

import {useLocation} from "react-router-dom";

import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import FlareIcon from '@material-ui/icons/Flare';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SettingsIcon from '@material-ui/icons/Settings';

import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
}));

const SideBar = props =>
{
	const classes = useStyles();
	let locations = useLocation().pathname.split("/");
	let location = locations[locations.length - 1];
	let menuEntries = [
		{ text: "Dashboard", icon: DashboardIcon },
		{ text: "Profile", icon: PersonIcon },
		{ text: "Collection", icon: FlareIcon },
		{ text: "Matches", icon: SportsEsportsIcon },
		{ text: "Settings", icon: SettingsIcon }
	];

	return(
		<Box p={2} m={2}>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<AddIcon />}
			>
				Create Game
			</Button>
		</Box>
	)
}

const NavMenuItem = props =>
{
	const Icon = props.icon;
	const Back = props.active ? Paper : Box

	const classes = useStyles();

	return(
		<Back elevation={8} style={{width: 100, height: 90}} onClick={() => props.history.push(props.children.toLowerCase())} className={props.active ? classes.activeNavBar : null}>
			<Grid container direction={"column"} style={{height: "100%"}}
				  justify={"center"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					<Icon style={{fill: "white"}}/>
				</Grid>
				<Grid item>
					<Typography variant={"h6"} style={{color: "white"}}>{props.children}</Typography>
				</Grid>
			</Grid>
		</Back>
	)
}

export default SideBar;
