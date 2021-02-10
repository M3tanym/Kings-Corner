import React from "react";

import {
	Avatar,
	Box,
	Divider,
	Grid, IconButton,
	List,
	ListItem,
	ListItemAvatar, ListItemSecondaryAction,
	ListItemText,
	Paper,
	Typography, useTheme
} from "@material-ui/core";

import {Link, useRouteMatch} from "react-router-dom";

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

import {AvatarGroup} from "@material-ui/lab";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

const DashBoard = props =>
{
	return (
		<Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} flexWrap={"noWrap"}>
			<Box>
				<Grid container spacing={4}>
					<Grid item xs style={{minWidth: 250}}>
						<WinRate />
					</Grid>
					<Grid item xs={6} style={{minWidth: 500}}>
						<YourRank />
					</Grid>
					<Grid item xs style={{minWidth: 300}}>
						<TopPlayers />
					</Grid>
				</Grid>
			</Box>
			<Box flexGrow={1} mt={4}>
				<Grid container spacing={4} style={{height: "100%"}}>
					<Grid item xs={4} style={{minWidth: 300}}>
						<Matches />
					</Grid>
					<Grid item xs style={{minWidth: 300}}>
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
						<Legend height={30} verticalAlign={"bottom"}/>
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
	const matches = ["A", "A", "A"];

	return(
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
					{matches.map((match, index) =>
						<ListItem onClick={() => props.history.push("/app/matches/" + index)} key={index}>
							<AvatarGroup max={2} style={{paddingRight: 20}}>
								<Avatar />
								<Avatar />
							</AvatarGroup>
							<ListItemText primary={"Match Name"} secondary="Your Turn" />
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

const BattlePass = props =>
{
	return(
		<Paper style={{height: "100%"}}>
			<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
				Battle Pass
			</Typography>
			<Divider />
			<Box minHeight={250} className={"horizontalScrollDiv"}>

			</Box>
		</Paper>
	)
}

export default DashBoard;
