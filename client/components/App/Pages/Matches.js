import React, {useContext} from "react";

import {Avatar, Box, Grid, IconButton, Paper, Typography} from '@material-ui/core';
import {AvatarGroup} from '@material-ui/lab';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

import {Link} from "react-router-dom";

import {useQuery} from "@apollo/client";

import {AuthContext} from "../../Router";
import {GetMatches} from "../../../graphql/query";


const Matches = props =>
{
	let authData = useContext(AuthContext);

	const { loading, error, data } = useQuery(GetMatches, {variables: { _id: authData.playerID }});

	if (loading) return null;
	if (error) return null;

	return(
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<Grid container spacing={4}>
					{data.user.matches.map((match, index) =>
						<Grid item key={index}>
							<MatchPaper match={match}/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	);
}

const MatchPaper = props =>
{
	return (
		<Paper style={{width: 400, height: 300}}>
			<Box p={3}>
				<Grid container spacing={2}
					  justify={"space-between"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<AvatarGroup max={2}>
							{props.match.players.map((player, index) => <Avatar key={index} src={player.avatar} />)}
						</AvatarGroup>
					</Grid>
					<Grid item>
						<Grid container direction={"column"}>
							<Grid item>
								<Typography variant={"body1"}>{props.match.name}</Typography>
							</Grid>
							<Grid item>
								<Typography variant={"body2"}>Your Turn</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item style={{marginLeft: "auto"}}>
						<Link to={"/app/matches/" + props.match._id}>
							<IconButton>
								<NavigateNextOutlinedIcon />
							</IconButton>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

export default Matches;
