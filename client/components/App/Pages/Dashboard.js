import React, {useContext} from "react";

import {
	Avatar,
	Box,
	Divider,
	Grid, IconButton,
	List,
	ListItem,
	ListItemAvatar, ListItemSecondaryAction,
	ListItemText,
	Paper, Step, StepLabel, Stepper,
	Typography, useTheme
} from "@material-ui/core";

import {AvatarGroup} from "@material-ui/lab";

import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import {Link} from "react-router-dom";

import {
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";


import {gql, useQuery} from "@apollo/client";

import {AuthContext} from "../../Router";

const DashBoard = props =>
{
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<Grid container spacing={4}>
					<Grid item xs style={{minWidth: 300}}>
						<WinRate />
					</Grid>
					<Grid item xs style={{minWidth: 550}}>
						<YourRank />
					</Grid>
					<Grid item xs style={{minWidth: 350}}>
						<TopPlayers />
					</Grid>
					<Matches />
					<Grid item xs style={{minWidth: 500}}>
						<BattlePass />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

const WinRate = props =>
{
	const theme = useTheme();

	const data = [
		{
			name: "Wins",
			value: 55,
			color: theme.palette.primary.main
		},
		{
			name: "Losses",
			value: 40,
			color: theme.palette.secondary.main
		},
		{
			name: "Stalemates",
			value: 5,
			color: "#404040"
		}
	];


	return(
		<Paper>
			<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
				Win Rate
			</Typography>
			<Divider />
			<Box style={{padding: 15}}>
				<ResponsiveContainer width={"100%"} height={200}>
					<PieChart>
						<Pie data={data} dataKey={"value"} nameKey={"name"} innerRadius={50}>
							{data.map((item, index) =>
								<Cell key={index} fill={item.color}/>
							)}
						</Pie>
						<Tooltip />
						<Legend height={35} verticalAlign={"bottom"}/>
					</PieChart>
				</ResponsiveContainer>
			</Box>
		</Paper>
	);
}

const YourRank = props =>
{
	const theme = useTheme();

	const data = [
		{
			"date": "Page A",
			"rank": 4000
		},
		{
			"date": "Page B",
			"rank": 3000
		},
		{
			"date": "Page C",
			"rank": 2000
		},
		{
			"date": "Page D",
			"rank": 2780
		},
		{
			"date": "Page E",
			"rank": 1890
		},
		{
			"date": "Page F",
			"rank": 2390,
		},
		{
			"date": "Page G",
			"rank": 3490
		}
	]

	return(
		<Paper>
			<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
				Rank Over Time
			</Typography>
			<Divider />
			<Box style={{paddingTop: 20, paddingRight: 30, paddingBottom: 10}}>
				<ResponsiveContainer width={"100%"} height={200} >
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Line dataKey="rank" stroke={theme.palette.primary.main} strokeWidth={3}/>
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Paper>
	);
}

const TopPlayers = props =>
{
	return(
		<Paper style={{height: "100%"}}>
			<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
				Top Players
			</Typography>
			<Divider />
			<List style={{height: 200, padding: 15}} dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText primary="Ben" secondary="1234 Rating" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText primary="Tim" secondary="1000 Rating" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText primary="Max" secondary="750 Rating" />
				</ListItem>
			</List>
		</Paper>
	);
}

const Matches = props =>
{
	let authData = useContext(AuthContext);

	const GetMatches = gql`
		query GetMatches($playerID: ID) {
			user(playerID: $playerID) {
				name
				matches {
					name
					currentTurn {
						name
					}
					players {
						avatar
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GetMatches, {variables: { playerID: authData.playerID }});

	if (loading) return null;
	if (error) return null;

	return(
		<Grid item xs style={{minWidth: 400}}>
			<Paper style={{height: "100%"}}>
				<Grid container
					  justify={"space-between"} alignContent={"center"} alignItems={"center"}
				>
					<Grid item>
						<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
							Matches
						</Typography>
					</Grid>
					<Grid item style={{paddingRight: 10}}>
						<Link to={`/app/matches`}>
							<IconButton>
								<NavigateNextOutlinedIcon />
							</IconButton>
						</Link>
					</Grid>
				</Grid>
				<Divider />
				<Box p={1}>
					<List>
						{data.user.matches.map((match, index) =>
							<ListItem key={index}>
								<AvatarGroup max={2} style={{paddingRight: 20}}>
									{match.players.map((player, index) =>
										<Avatar src={player.avatar} key={index}/>
									)}
								</AvatarGroup>
								<ListItemText primary={match.name} secondary={"Your Turn"} />
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
		</Grid>
	)
}

const BattlePass = props =>
{
	const items = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"];
	const stepCount = 2;

	return(
		<Paper style={{height: "100%"}}>
			<Grid container
				  justify={"space-between"} alignContent={"center"} alignItems={"center"}
			>
				<Grid item>
					<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
						Battle Pass
					</Typography>
				</Grid>
				<Grid item style={{paddingRight: 10}}>
					<Link to={`/app/battle-pass`}>
						<IconButton>
							<NavigateNextOutlinedIcon />
						</IconButton>
					</Link>
				</Grid>
			</Grid>
			<Divider />
			<Box p={4} flexGrow={1} display={"flex"}>
				<Box p={1} flexGrow={1} height={"100%"} width={500} display={"flex"} flexDirection={"column"} className={"horizontalScrollDiv"}>
					<Box mb={2} display={"flex"} alignContent={"center"} alignItems={"center"}>
						{items.map((item, index) =>
							<Box ml={3} mr={3} minWidth={140} height={140} border={2} borderColor={"#222222"} key={index}/>
						)}
					</Box>
					<Box pl={5} pr={5}>
						<Stepper activeStep={stepCount} style={{width: 1800}}>
							{items.map((label, index) =>
								<Step key={index}>
									<StepLabel />
								</Step>
							)}
						</Stepper>
					</Box>
				</Box>
			</Box>
		</Paper>
	)
}

export default DashBoard;
