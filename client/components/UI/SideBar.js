import React from "react";

import {useLocation} from "react-router-dom";

import {Box, Grid, Paper, Typography} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import FlareIcon from '@material-ui/icons/Flare';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
	navBar: {
		backgroundColor: theme.palette.secondary.main,
		padding: theme.spacing(3)
	},
	activeNavBar: {
		backgroundColor: theme.palette.primary.main
	}
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
		<Box p={3} width={"100%"} height={"100%"}>
			<Paper style={{width: "100%", height: "100%"}} className={classes.navBar}>
				<Grid container direction={"column"} spacing={2} style={{height: "100%"}}
					  justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					{menuEntries.map((item, index) =>
						<Grid item key={index} style={{width: "100%"}}>
							<NavMenuItem icon={item.icon} active={location === item.text.toLowerCase()} {...props}>
								{item.text}
							</NavMenuItem>
						</Grid>
					)}
				</Grid>
			</Paper>
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
