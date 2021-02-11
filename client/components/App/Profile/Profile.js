import React, {useState} from "react";

import {Box, Card, Grid, Paper, Typography} from "@material-ui/core";

import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';

import Image from "../../../static/images/carousel/carousel1.jpg"

const Profile = props =>
{
	return (
		<Grid container spacing={4} style={{height: "100%"}}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item xs={6} style={{height: "100%"}}>
				<Stats />
			</Grid>
			<Grid item xs={6} style={{height: "100%"}}>
				<MatchHistory />
			</Grid>
		</Grid>
	);
}

const Stats = props =>
{
	return(
		<Grid container spacing={6} style={{height: "100%"}}
			  alignContent={"center"} alignItems={"center"}
		>
			<Grid item>
				<img alt={"User Profile"} src={Image} style={{width: 200, height: 200, borderRadius: "50%"}} />
			</Grid>
			<Grid item>
				<Grid container spacing={2}
					  alignContent={"center"} alignItems={"center"}
				>
					<Grid item xs={12}>
						<Typography variant={"h2"}>mrosoff</Typography>
					</Grid>
					<Grid item>
						<DoneAllIcon />
					</Grid>
					<Grid item>
						<Typography variant={"h6"}>10 Wins</Typography>
					</Grid>
					<Grid item>
						<ClearIcon />
					</Grid>
					<Grid item>
						<Typography variant={"h6"}>100 Losses</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

const MatchHistory = props =>
{
	const matches = [];

	return(
		<Paper style={{width: "100%", height: "100%", overflow: "hidden"}}>
			<Grid container spacing={2} style={{overflow: "auto"}}>
				<Grid item>
					<Typography>Match History</Typography>
				</Grid>
				{matches.map(match =>
					<Grid item>
						<Match match={match}/>
					</Grid>
				)}
			</Grid>
		</Paper>
	)
}

const Match = props =>
{
	return(
		<Card>

		</Card>
	)

}

export default Profile;
