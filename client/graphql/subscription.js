import {gql} from "@apollo/client";

export const GetMatchUpdates = gql`
    subscription GetMatchUpdates($playerID: ID!, $matchID: ID!) {
        getMatchUpdates(playerID: $playerID, matchID: $matchID) {
            currentState
            history
        }
    }
`;