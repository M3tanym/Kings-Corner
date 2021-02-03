import React from "react";

import {Grid, Link, Typography} from "@material-ui/core";

import Logo from './UI/Logo';

const NotFound = props =>
{
	return(

		<Grid container spacing={6}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Logo height={120}/>
			</Grid>
			<Grid item container spacing={5} style={{width: "100%"}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item container spacing={2}
					  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h5"} align={"center"}>Page Not Found</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>Lost? Lets get you back on track.</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<BackToSignInArea {...props}/>
			</Grid>
		</Grid>
	)
};

const BackToSignInArea = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>Head on back</Typography>
			</Grid>
			<Grid item>
				<Link variant={"body2"} onClick={() => props.history.push("/login")}>Sign In</Link>
			</Grid>
		</Grid>
	)
}

export default NotFound;
