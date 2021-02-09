import React from 'react';

import {Avatar, Box, Divider, Grid, IconButton, Paper, Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

const useStyles = makeStyles(theme => ({
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	}
}));

const InProgressCard = props =>
{
	const classes = useStyles();
	return (
		<Paper width={350} height={250} className={classes.cardBox}>
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
											<Typography>{new Date().getUTCDate()}</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation={"vertical"} style={{height: 30}}/>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<ChatBubbleOutlineOutlinedIcon />
										</Grid>
										<Grid item>
											<Typography>0</Typography>
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

export default InProgressCard;
