import React, {useContext, useState} from "react";

import {Avatar, Box, Button, Grid, IconButton, InputBase, Typography} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import {grey} from "@material-ui/core/colors";

import Logo from "../UI/Logo";

import {gql, useQuery} from "@apollo/client";

import {AuthContext} from "../Router";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(5),
		height: theme.spacing(5),
	},
}));

const NavBar = props =>
{
	return(
		<Box pl={8} pr={8} ml={8} mr={8}>
			<Grid container
				  justify={"space-between"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<LogoHeader />
				</Grid>
				<Grid item>
					<NavLinks />
				</Grid>
				<Grid item>
					<Link to={"/login"}>
						<Button
							variant={"contained"}
						>
							Login
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}

const LogoHeader = props =>
{
	return(
		<Box p={2}>
			<Grid item container
				  justify={"center"} alignItems={"center"} alignContent={"center"}>
				<Grid item>
					<Logo height={50}/>
				</Grid>
			</Grid>
		</Box>
	)
}

const NavLinks = props =>
{
	return(
		<Box p={2}>
			<Grid container spacing={6}
				  justify={"center"}
			>
				<Grid item>
					<a href="#download">
						<Typography variant={"h6"} style={{color: "#FFFFFF"}}>Download</Typography>
					</a>
				</Grid>
				<Grid item>
					<a href="#overview">
						<Typography variant={"h6"} style={{color: "#FFFFFF"}}>Overview</Typography>
					</a>
				</Grid>
				<Grid item>
					<a href="#more">
						<Typography variant={"h6"} style={{color: "#FFFFFF"}}>More</Typography>
					</a>
				</Grid>
			</Grid>
		</Box>
	)
}

export default NavBar;
