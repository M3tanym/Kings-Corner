import React from 'react';

import {Avatar, Box, Grid, Paper, Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import {AvatarGroup} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	}
}));

const InProgressLineCard = props =>
{
	const classes = useStyles();
	return (
		<Paper width={1100} height={90} className={classes.cardBox} onClick={() => props.history.push("/app/matches/" + props.id)}>
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
		</Paper>
	);
}

export default InProgressLineCard;
