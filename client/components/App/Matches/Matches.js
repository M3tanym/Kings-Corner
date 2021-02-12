import React from "react";

import {Box, Grid} from '@material-ui/core';

import InProgressCard from '../../UI/Cards/InProgressCard';

const Matches = props =>
{
	const matches = ["A", "A", "A", "A", "A"];

	return(
		<Box width={"100%"} height={"100%"} className={"verticalScrollDiv"}>
			<Box pr={4} height={"80vh"}>
				<Grid container spacing={4}>
					{matches.map((match, index) =>
						<Grid item xs={6} key={index}>
							<InProgressCard id={index} {...props}/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	)
}

export default Matches;
