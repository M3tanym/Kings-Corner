import React from "react";

import {Box, Grid, Paper} from "@material-ui/core";

import ChessBoard from './ChessBoard';
import Chessground from "react-chessground";

const Match = props =>
{
	return(
		<Grid container>
			<Grid item xs={6}>
				<Paper>

				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Paper>
					<Chessground width={500} height={500} />
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Match;
