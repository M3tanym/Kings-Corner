import {gql} from "@apollo/client";

export const CreateUser = gql`
    mutation CreateUser($email: String!, $password: String!, $inGameName: String!) {
        createUser(email: $email, password: $password, inGameName: $inGameName) {
            _id
        }
    }
`;

export const Login = gql`
    mutation Login($email: String, $inGameName: String, $password: String!) {
        login(email: $email, inGameName: $inGameName, password: $password) {
            _id
        }
    }
`;

export const CreateMatch = gql`
    mutation CreateMatch($playerID: ID!) {
        createMatch(playerID: $playerID) {
            _id
        }
    }
`;