import React from "react";

import {Box, Grid, Paper} from "@material-ui/core";

import ChessBoard from "./ChessBoard";

const Match = props =>
{
	return(
		<Box width={"100%"} height={"100%"} display={"flex"}>
			<Box width={250} pt={2} pl={2}>
				<Grid container direction={"column"} spacing={4}>
					<Grid item xs>
						<Paper>
							<Box width={"100%"} height={200}>
								It is your turn
							</Box>
						</Paper>
					</Grid>
					<Grid item xs>
						<Paper>
							<Box width={"100%"} height={200}>
								Move History
							</Box>
						</Paper>
					</Grid>
					<Grid item xs>
						<Paper>
							<Box width={"100%"} height={150}>
								Notes
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Box ml={4} flexGrow={1} p={2} display={"flex"} alignItems={"center"} alignContent={"center"}>
				<ChessBoard />
			</Box>
		</Box>
	)
}

export default Match;
