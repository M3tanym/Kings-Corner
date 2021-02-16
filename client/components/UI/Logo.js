import React from "react";

import Image from "../../static/images/logo.png";

import {Link} from "react-router-dom";

const Logo = props =>
{
	return(
		<Link to={"/"}>
			<img alt={"Kings Corner Logo"} src={Image} style={{height: props.height}}/>
		</Link>
	)
}

export default Logo;
