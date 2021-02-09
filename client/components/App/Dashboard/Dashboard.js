import React from "react";

import {Avatar, Box, Grid, Typography} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';

import InProgressCard from '../../UI/Cards/InProgressCard';
import InviteCard from '../../UI/Cards/InviteCard';
import FinishedMatchCard from '../../UI/Cards/FinishedMatchCard';

import Image from "../../../static/images/carousel1.jpg";

const DashBoard = props =>
{
	return (
		<Box>
			<InProgressMatches />
		</Box>
	);
}

const InProgressMatches = props =>
{
	const matches = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>In Progress</Typography>
			</Grid>
			<Grid item>
				<Box width={375} height={600} className={"verticalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{matches.map((match, index) =>
							<Grid item key={index}>
								<InProgressCard />
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	)
}

const CreateInvitationWithFriends = props =>
{
	const friends = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Invite A Friend</Typography>
			</Grid>
			<Grid item>
				<Box width={700} height={55} className={"horizontalScrollDiv"}>
					<Grid container style={{height: "inherit"}}>
						{friends.map((match, index) =>
							<Grid item key={index}>
								<Box mr={1}>
									<Avatar src={Image}/>
								</Box>
							</Grid>
						)}
						<Grid item>
							<Avatar>
								<AddIcon />
							</Avatar>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	)
}

const PendingInvites = props =>
{
	const invites = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Pending Invites</Typography>
			</Grid>
			<Grid item>
				<Box width={700} height={225} className={"horizontalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{invites.map((match, index) =>
							<Grid item key={index}>
								<InviteCard />
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

const FinishedMatches = props =>
{
	const finishedGames = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Recent Matches</Typography>
			</Grid>
			<Grid item>
				<Box width={700} height={250} className={"verticalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{finishedGames.map((match, index) =>
							<Grid item key={index}>
								<Box>
									<FinishedMatchCard />
								</Box>
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

export default DashBoard;
