import React, {useContext} from "react";

import {Box, Grid} from '@material-ui/core';

import InProgressCard from '../../UI/Cards/InProgressCard';

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

	const { loading, error, data } = useQuery(GetMatches, {variables: {playerID: authData.playerID}});

	if (loading) return null;
	if (error) return null;

	return(
		<Box width={"100%"} height={"100%"} className={"verticalScrollDiv"}>
			<Box pr={4} height={"80vh"}>
				<Grid container spacing={4}>
					{data.user.matches.map((match, index) =>
						<Grid item xs={4} key={index}>
							<InProgressCard id={index} {...props}/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	)
}

export default Matches;
