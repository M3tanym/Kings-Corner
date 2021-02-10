import React, {useState} from "react";

import {Avatar, Box, Grid, IconButton, InputBase, Typography} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import {grey} from "@material-ui/core/colors";

import Logo from "../UI/Logo";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(5),
		height: theme.spacing(5),
	},
}));

const HeaderBar = props =>
{
	return(
		<Box display={"flex"} flexWrap={"nowrap"}>
			<LogoHeader />
			<Search />
			<Notifications />
			<Profile />
		</Box>
	)
}

const LogoHeader = props =>
{
	return(
		<Box p={2} minWidth={300}>
			<Grid item container
				  justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<Logo height={60}/>
				</Grid>
			</Grid>
		</Box>
	)
}

const Search = props =>
{
	return(
		<Box p={2} minWidth={250} flexGrow={1} bgcolor={grey[100]}>
			<Grid container spacing={2} style={{height: "inherit"}}
				  alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<SearchOutlinedIcon />
				</Grid>
				<Grid item>
					<InputBase />
				</Grid>
			</Grid>
		</Box>
	)
}

const Notifications = props =>
{
	return(
		<Box p={2} minWidth={80}>
			<Grid container
				  justify={"center"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					<IconButton>
						<NotificationsOutlinedIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Box>


	)
}

const Profile = props =>
{
	const classes = useStyles();

	const [openMenu, setOpenMenu] = useState(false);

	return(
		<Box p={2} minWidth={220}>
			<Grid container spacing={2}
				  justify={"flex-end"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					<Avatar alt={"Profile"} className={classes.avatar}/>
				</Grid>
				<Grid item>
					<Typography variant={"subtitle2"}>Max Rosoff</Typography>
				</Grid>
				<Grid item>
					<IconButton onClick={() => setOpenMenu(!openMenu)}>
						<ArrowDropDownOutlinedIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Box>
	);
}

export default HeaderBar;
