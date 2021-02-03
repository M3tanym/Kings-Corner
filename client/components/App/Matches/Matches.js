import React from "react";

import {Box, Grid} from '@material-ui/core';
import InProgressLineCard from '../../UI/Cards/InProgressLineCard';

const Matches = props =>
{
	const matches = ["A", "A", "A", "A", "A"];

	return(
		<Box width={"100%"} height={"100%"} className={"verticalScrollDiv"}>
			<Grid container spacing={1} style={{height: "inherit"}}>
				{matches.map((match, index) =>
					<Grid item key={index}>
						<InProgressLineCard id={index} {...props}/>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default Matches;
