import React from "react";

import {CssBaseline} from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {grey} from "@material-ui/core/colors";

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import { SnackbarProvider } from 'notistack';

import Router from "./Router";

const App = () =>
{
    let theme = createMuiTheme({
        palette: {
            type: "light",
            primary: { main: '#653D23' },
            secondary: { main: '#E2AF6E' },
            neutral: { main: '#FFFFFF', light: grey[100], dark: grey[200] },
        },
    })
    theme = responsiveFontSizes(theme);

    const client = new ApolloClient({
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache()
    });

    /*
    const subscriptionService = new ApolloClient({
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache()
    });
    */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <ApolloProvider client={client}>
                    <Router />
                </ApolloProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
