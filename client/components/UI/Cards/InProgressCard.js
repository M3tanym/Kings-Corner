import React from 'react';

import {Avatar, Box, Grid, Paper, Typography} from '@material-ui/core';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import {AvatarGroup} from '@material-ui/lab';

const InProgressCard = props =>
{
	return (
		<Paper onClick={() => props.history.push("/app/matches/" + props.id)}>
			<Box width={350} height={100} p={3}>
				<Grid container spacing={2}
					  justify={"space-between"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<AvatarGroup max={2}>
							<Avatar />
							<Avatar />
						</AvatarGroup>
					</Grid>
					<Grid item>
						<Grid container direction={"column"}>
							<Grid item>
								<Typography variant={"h6"}>Match Name</Typography>
							</Grid>
							<Grid item>
								<Typography>Your Turn</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item style={{marginLeft: "auto"}}>
						<NavigateNextOutlinedIcon />
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

export default InProgressCard;
