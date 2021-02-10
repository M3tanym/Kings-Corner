import React from "react";

import {Box, Grid} from '@material-ui/core';
import InProgressLineCard from '../../UI/Cards/InProgressCard';

const Matches = props =>
{
	const matches = ["A", "A", "A", "A", "A"];

	return(
		<Box width={"100%"} height={"100%"} className={"verticalScrollDiv"}>
			<Grid container spacing={4}>
				{matches.map((match, index) =>
					<Grid item xs={4} key={index}>
						<InProgressLineCard id={index} {...props}/>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default Matches;
