import React from 'react';

import {Avatar, Box, Grid, IconButton, Paper, Typography} from '@material-ui/core';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import {AvatarGroup} from '@material-ui/lab';

import {Link} from "react-router-dom";

const InProgressCard = props =>
{
	return (
		<Paper>
			<Box height={250} p={3}>
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
								<Typography variant={"body1"}>Match Name</Typography>
							</Grid>
							<Grid item>
								<Typography variant={"body2"}>Your Turn</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item style={{marginLeft: "auto"}}>
						<Link to={"/app/matches/" + props.id}>
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

export default InProgressCard;
