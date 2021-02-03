import React from "react";

import Image from "../../static/images/logo.png";

const Logo = props =>
{
	return(
		<img alt={"Kings Corner Logo"} src={Image} style={{height: props.height}}/>
	)
}

export default Logo;
