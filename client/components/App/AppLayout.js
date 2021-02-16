import React from "react";

import {Box} from "@material-ui/core";

import SideBar from "../UI/SideBar";
import HeaderBar from "../UI/HeaderBar";

const AppLayout = props =>
{
    return (
        <Box width={"100vw"} minHeight={"100vh"}>
            <Box height={75}>
                <HeaderBar {...props}/>
            </Box>
            <Box display={"flex"} flexWrap={"nowrap"} minHeight={"calc(100vh - 75px)"}>
                <Box minWidth={280} p={4} bgcolor={"neutral.light"}>
                    <SideBar {...props}/>
                </Box>
                <Box flexGrow={1} p={4} bgcolor={"neutral.dark"}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
};

export default AppLayout;
