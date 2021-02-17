import React, {useContext} from "react";

import {Box, Grid} from '@material-ui/core';

import MatchPaper from '../../UI/MatchPaper';

import {gql, useQuery} from "@apollo/client";

import {AuthContext} from "../../Router";

const Matches = props =>
{
	let authData = useContext(AuthContext);

	const GetMatches = gql`
		query GetMatches($playerID: ID) {
			user(playerID: $playerID) {
				name
				matches {
					name
					currentTurn {
						name
					}
					players {
						avatar
					}
				}
			}
		}
	`;

	/// const { loading, error, data } = useQuery(GetMatches, {variables: {playerID: authData.playerID}});

	// if (loading) return null;
	// if (error) return null;

	const data = { user: { matches: ["a", "a", "a", "a", "a", "a"]}}
	return(
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<Grid container spacing={4}>
					{data.user.matches.map((match, index) =>
						<Grid item key={index}>
							<MatchPaper id={index}/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	)
}

export default Matches;
