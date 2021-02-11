import React from "react";

import {Typography} from "@material-ui/core";

import {Link} from "react-router-dom";

const Home = props =>
{
	return(
		<Link to="/login">
			<Typography variant={"h2"}>Login</Typography>
		</Link>
	)
}

export default Home;
