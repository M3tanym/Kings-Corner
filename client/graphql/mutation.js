import {gql} from "@apollo/client";

export const CreateMatch = gql`
    mutation CreateMatch($playerID: ID!) {
        createMatch(playerID: $playerID) {
            _id
        }
    }
`;