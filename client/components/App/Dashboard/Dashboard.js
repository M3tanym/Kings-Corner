import React from "react";

import {Box, Grid, Paper} from "@material-ui/core";

import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

import InProgressCard from '../../UI/Cards/InProgressCard';

const DashBoard = props =>
{
	return (
		<Box width={"100%"} height={"100%"} className={"verticalScrollDiv"}>
			<Grid container spacing={4}>
				<Grid item>
					<WinRate />
				</Grid>
				<InProgressMatches />
			</Grid>
		</Box>

	);
}

const WinRate = props =>
{
	const data = [
		{
			name: "Wins",
			value: 55,
			color: "#512DA8"
		},
		{
			name: "Losses",
			value: 40,
			color: "#4DB6AC"
		},
		{
			name: "Stalemates",
			value: 5,
			color: "#404040"
		}
	];


	return(
		<Paper style={{padding: 15}}>
			<PieChart width={250} height={250}>
				<Pie data={data} dataKey={"value"} nameKey={"name"} innerRadius={70}>
					{data.map((item, index) =>
						<Cell key={index} fill={item.color}/>
					)}
				</Pie>
				<Tooltip />
				<Legend height={35} verticalAlign={"bottom"}/>
			</PieChart>
		</Paper>
	)
}

const InProgressMatches = props =>
{
	const matches = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"];

	return matches.map((match, index) =>
		<Grid item key={index}>
			<InProgressCard />
		</Grid>
	);
}

export default DashBoard;
