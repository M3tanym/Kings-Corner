import React, {useContext} from "react";

import {Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";

import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';

import ChessBoard from "./ChessBoard";

import {useQuery} from "@apollo/client";

import {AuthContext} from "../../Router";
import {GetMatchData} from "../../../graphql/query";

const Match = props =>
{
	let authData = useContext(AuthContext);

	const { loading, error, data } = useQuery(GetMatchData, {variables: {_id: authData.playerID}});

	if (loading) return null;
	if (error) return null;

	return(
		<Box width={"100%"} height={"100%"} display={"flex"}>
			<Box minWidth={250} pt={2} pl={2} display={"flex"} flexDirection={"column"}>
				<Box>
					<Paper>
						<Box p={3} width={"100%"}>
							<Grid container spacing={5}
								  justify={"center"} alignContent={"center"} alignItems={"center"}
							>
								<CallMissedOutgoingIcon style={{width: 40, height: 40}}/>
								<Grid item>
									<Typography variant={"h6"}>Your Turn</Typography>
								</Grid>
							</Grid>

						</Box>
					</Paper>
				</Box>
				<Box mt={4} flexGrow={1}>
					<Paper style={{height: "100%"}}>
						<Typography variant={"h6"} align={"center"} style={{padding: 16}}>
							Match History
						</Typography>
						<Divider />
						<Box p={1}>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={"Knight Captures Pawn"} secondary={"A4 - A3"} />
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={"Pawn Moves To A3"} secondary={"A4 - A3"} />
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={"Rook Captures Queen"} secondary={"A4 - A3"} />
								</ListItem>
							</List>
						</Box>
					</Paper>
				</Box>
			</Box>
			<Box ml={4} flexGrow={1} p={2} display={"flex"} alignItems={"center"} alignContent={"center"}>
				<ChessBoard />
			</Box>
		</Box>
	)
}

export default Match;
