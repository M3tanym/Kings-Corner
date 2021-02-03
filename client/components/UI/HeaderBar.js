import React, {useState} from "react";

import {Avatar, Box, Divider, Grid, IconButton, InputBase, Typography} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import Logo from "../UI/Logo";
import Image from "../../static/images/background.jpg";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
}));

const HeaderBar = props =>
{
	return(
		<Grid container style={{width: "100%", height: "100%"}}
			  alignContent={"center"} alignItems={"center"}
		>
			<Grid item container style={{width: 200}}
				  justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Logo height={60}/>
			</Grid>
			<Divider orientation="vertical" flexItem style={{height: "100%"}}/>
			<Grid item>
				<Search />
			</Grid>
			<Divider orientation="vertical" flexItem style={{height: "100%"}}/>
			<Grid item>
				<Notifications />
			</Grid>
			<Divider orientation="vertical" flexItem style={{height: "100%"}}/>
			<Grid item>
				<Profile />
			</Grid>
		</Grid>
	)
}

const Search = props =>
{
	return(
		<Box p={3} width={800}>
			<Grid container spacing={2}
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
		<Grid container style={{width: 100, paddingTop: 5}}
			  justify={"center"} alignContent={"center"} alignItems={"center"}
		>
			<Grid item>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
			</Grid>
		</Grid>
	)
}

const Profile = props =>
{
	const classes = useStyles();

	const [openMenu, setOpenMenu] = useState(false);

	return(
		<Grid container direction={"column"} style={{width: 300}}>
			<Grid item>
				<Box p={2} >
					<Grid container spacing={2}
						  justify={"flex-end"} alignContent={"center"} alignItems={"center"}
					>
						<Grid item>
							<Avatar alt={"Profile"} src={Image} className={classes.avatar}/>
						</Grid>
						<Grid item>
							<Grid container direction={"column"}>
								<Grid item>
									<Typography variant={"subtitle2"}>Max Rosoff</Typography>
								</Grid>
								<Grid item>
									<Typography variant={"body2"}>Some other thing</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{paddingLeft: 20}}>
							<IconButton onClick={() => setOpenMenu(!openMenu)}>
								<ArrowDropDownOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			</Grid>
			{openMenu ?
				<Grid item>
				</Grid> : null
			}
		</Grid>

	);
}

export default HeaderBar;
