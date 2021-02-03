import React from "react";

import {Box, Grid, Paper} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import SideBar from "../UI/SideBar";
import HeaderBar from "../UI/HeaderBar";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5)
    }
}));

const AppLayout = props =>
{
    const classes = useStyles();

    return (
        <Box height={"100vh"}>
            <Box width={"100%"} height={85}>
                <HeaderBar {...props}/>
            </Box>
            <Box width={"100%"} height={"calc(100% - 85px)"} bgcolor={grey[200]}>
                <Grid container style={{height: "100%"}}>
                    <Grid item style={{width: 200, height: "100%"}}>
                        <SideBar {...props}/>
                    </Grid>
                    <Grid item xs>
                        <Box pt={3} pb={3} pr={3} width={"100%"} height={"100%"}>
                            <Paper id={"wrappingPaper"} style={{width: "100%", height: "100%", overflow: "hidden"}} className={classes.root}>
                                {props.children}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AppLayout;
