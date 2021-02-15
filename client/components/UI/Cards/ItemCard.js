import React from 'react';

import {Box, Grid, Paper, Typography} from '@material-ui/core';

const ItemCard = props =>
{
	return (
		<Paper>
			<Box width={240} height={280} p={4}>
				<Grid container direction={"column"} spacing={4}
					  justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Box border={3} width={150} height={120}>
							{props.picture}
						</Box>
					</Grid>
					<Grid item container direction={"column"} spacing={1}>
						<Grid item>
							<Typography variant={"h6"} align={"center"}>{props.name}</Typography>
						</Grid>
						<Grid item>
							<Typography align={"center"}>{props.description}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

export default ItemCard;
