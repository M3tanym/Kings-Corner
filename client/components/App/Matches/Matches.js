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
	if (error) return <InProgressCard />;

	return(
		<Box width={"100%"} height={"100%"} height={500} className={"verticalScrollDiv"}>
			<Grid container spacing={4}>
				{data.user.matches.map((match, index) =>
					<Grid item xs={4} key={index}>
						<InProgressCard id={index}/>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default Matches;
