import React from "react";

import { ApolloClient, InMemoryCache } from '@apollo/client';

import {CssBaseline} from "@material-ui/core";
import {blueGrey, green} from "@material-ui/core/colors";

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import { SnackbarProvider, useSnackbar } from 'notistack';

import Router from "./Router";

const App = () =>
{
    let theme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                main: '#512da8',
            },
            secondary: {
                main: '#4db6ac',
            },
        },
    })
    theme = responsiveFontSizes(theme);

    const client = new ApolloClient({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        cache: new InMemoryCache()
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp client={client}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

const LoadApp = props =>
{
    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant="error") => enqueueSnackbar(message, { variant: variant });

    return <Router produceSnackBar={produceSnackBar} {...props}/>;
};

export default App;
