import React from 'react';

import {Avatar, Box, Divider, Grid, IconButton, Paper, Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

const useStyles = makeStyles(theme => ({
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		width: 310,
		height: 250
	}
}));

const FinishedMatchCard = props =>
{
	const classes = useStyles();
	return (
		<Paper className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={4}>
						<Grid item>
							<Typography variant={"h6"}>Match Name</Typography>
						</Grid>
						<Grid item>
							<Grid container spacing={2}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Avatar />
								</Grid>
								<Grid item>
									<Avatar />
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container spacing={9}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<ScheduleOutlinedIcon />
										</Grid>
										<Grid item>
											{new Date().getUTCDate()}
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation={"vertical"} style={{height: 30}}/>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<NavigateNextOutlinedIcon />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default FinishedMatchCard;
