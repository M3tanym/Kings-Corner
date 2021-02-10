import React from "react";

import {useLocation} from "react-router-dom";

import {Box, Button, Grid, Typography} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontIcon from '@material-ui/icons/Storefront';

const SideBar = props =>
{
	let locations = useLocation().pathname.split("/");
	let location = locations[locations.length - 1];

	let menuEntries = [
		{ text: "Dashboard", icon: DashboardIcon },
		{ text: "Matches", icon: SportsEsportsIcon },
		{ text: "Collection", icon: ShoppingBasketIcon, disabled: true },
		{ text: "Shop", icon: StorefrontIcon, disabled: true },
	];

	return(
		<Box width={"100%"} height={"100%"}
			 display={"flex"} flexWrap={"nowrap"} flexDirection={"column"} justifyContent="center"
		>
			<Box>
				<Button
					fullWidth
					variant={"contained"}
					color={"primary"}
					style={{height: 50, borderRadius: 8, textTransform: 'none'}}
				>
					<Grid container spacing={3}
						  justify={"center"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Typography>Create Game</Typography>
						</Grid>
						<AddIcon />
					</Grid>
				</Button>
			</Box>
			<Box mt={4} mb={6} flexGrow={1}>
				{menuEntries.map((item, index) =>
					<NavMenuItem
						key={index}
						icon={item.icon}
						active={location === item.text.toLowerCase()}
						disabled={item.disabled}
						{...props}
					>
						{item.text}
					</NavMenuItem>
				)}
			</Box>
			<Box width={"100%"} height={250} bgcolor={"primary.main"} borderRadius={8}>

			</Box>
		</Box>
	)
}

const NavMenuItem = props =>
{
	const Icon = props.icon;

	return(
		<Box mt={2}>
			<Button
				fullWidth
				disabled={props.disabled}
				style={{height: 50, borderRadius: 8, textTransform: 'none'}}
				onClick={() => props.history.push(props.children.toLowerCase())}
			>
				<Grid container spacing={4} style={{paddingLeft: 35}}
					  alignItems={"center"} alignContent={"center"}
				>
					<Icon color={props.active ? "primary" : undefined}/>
					<Grid item>
						<Typography>{props.children}</Typography>
					</Grid>
				</Grid>
			</Button>
		</Box>
	)
}

export default SideBar;
