import React from "react";

import {Box, Button, Grid, Typography} from "@material-ui/core";

import {Link} from "react-router-dom";

import NavBar from "./NavBar";

const Home = props =>
{
	return(
		<Box width={"100vw"} height={"100vh"} style={{scrollBehavior: "smooth"}}>
			<Box width={"100%"} height={"100%"} style={{}}>
				<Box id={"download"} minHeight={626} display={"flex"} flexDirection={"column"} bgcolor={"primary.main"}>
					<Box>
						<NavBar />
					</Box>
					<Box flexGrow={1} display={"flex"} alignItems={"stretch"}>
						<AppOptions />
					</Box>
				</Box>
				<Box id={"overview"} minHeight={626}>
					Content
				</Box>
				<WaveDivider />
				<Box id={"more"} minHeight={626} bgcolor={"neutral.dark"}>
					Content
				</Box>
				<WaveDivider flip />
				<Box minHeight={626}>
				</Box>
			</Box>
		</Box>
	);
}

const AppOptions = props =>
{
	return(
		<Grid container
			justify={"center"} alignContent={"center"} alignItems={"center"}
		>
			<Grid item>
				<Grid container spacing={8}>
					<Grid item>
						<Button
							variant={"contained"}
							size={"large"}
						>
							Download For MacOS
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant={"contained"}
							size={"large"}
						>
							Open In Browser
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>

	)
}

const WaveDivider = props =>
{
	return(
		<Box color={"neutral.dark"} style={{transform: props.flip ? "matrix(1,0,0,-1,0,0)" : undefined}}>
			<svg style={{display: "block"}} viewBox="0 0 1440 100" preserveAspectRatio="none">
				<path className={"wave"} fill="currentColor" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"/>
			</svg>
		</Box>
	)
}

export default Home;
