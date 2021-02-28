import React, {useContext, useState} from "react";

import {Link} from "react-router-dom";

import {Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, TextField, Typography} from "@material-ui/core";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import MaskedInput from "react-text-mask";

import {useQuery} from "@apollo/client";
import {GetMatchHistory, GetTraditionalProfile} from "../../../graphql/query";

import {AuthContext} from "../../Router";

const Profile = props =>
{
	return (
		<Box display={"flex"}>
			<Box>
				<UserDetails />
			</Box>
			<Box ml={4} flexGrow={1}>
				<MatchHistory />
			</Box>
		</Box>
	);
}

const UserDetails = props =>
{
	let authData = useContext(AuthContext);

	const { loading, error, data } = useQuery(GetTraditionalProfile, {
		variables: { _id: authData.playerID }
	});

	return(
		<Box display={"flex"} flexDirection={"column"}>
			<Paper>
				<Box p={4} display={"flex"} alignContent={"center"} alignItems={"center"}>
					<Box>
						<img alt={"User Profile"} src={data.user.avatar} style={{width: 100, height: 100, borderRadius: "50%"}} />
					</Box>
					<Box ml={4} flexGrow={1}>
						<Typography variant={"h4"}>{data.user.inGameName}</Typography>
						<Typography variant={"h6"}>Gold III</Typography>
					</Box>
				</Box>
			</Paper>
			<Box mt={4} flexGrow={1}>
				<EditUserInfo />
			</Box>
		</Box>
	)
}

const EditUserInfo = props =>
{
	return(
		<Paper>
			<Box p={4} display={"flex"} flexDirection={"column"}>
				<Field
					name={"Email"}
					input={<TextField />}
				/>
				<Field
					mt={2}
					name={"Phone Number"}
					input={<PhoneNumberInput />}
				/>
				<Field
					mt={2}
					name={"Password"}
					input={<TextField />}
				/>
			</Box>
		</Paper>
	)
}

const Field = props =>
{
	const [editField, setEditField] = useState(false);

	return(
		<Box mt={props.mt} display={"flex"} justifyContent={editField ? undefined : "space-between"}>
			<Typography variant={"h6"}>{props.name}</Typography>
			{
				editField ?
					<Box ml={2}>
						{props.input}
					</Box> :
					<Button variant={"contained"} color={"secondary"} onClick={() => setEditField(true)}>
						Edit
					</Button>
			}
		</Box>
	)
}

const PhoneNumberInput = props =>
{
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

const MatchHistory = props =>
{
	let authData = useContext(AuthContext);

	const { loading, error, data } = useQuery(GetMatchHistory, {
		variables: { _id: authData.playerID }
	});

	return(
		<Paper style={{height: "100%"}}>
			<Grid container
				  justify={"space-between"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
						Match History
					</Typography>
				</Grid>
				<Grid item style={{paddingRight: 10}}>
					<Link to={`/app/match-history`}>
						<IconButton>
							<NavigateNextOutlinedIcon />
						</IconButton>
					</Link>
				</Grid>
			</Grid>
			<Divider />
			<Box p={1}>
				<List>
					{data.user.finishedMatches.map((match, index) =>
						<ListItem key={index}>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText primary={"Match Name"} secondary={"Your Turn"} />
							<ListItemSecondaryAction>
								<Link to={"/app/matches/" + index}>
									<IconButton>
										<NavigateNextOutlinedIcon />
									</IconButton>
								</Link>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</List>
			</Box>
		</Paper>
	)
}

export default Profile;
