import {gql} from "@apollo/client";

export const GetInfoFromSearch = gql`
	query GetInfoFromSearch($email: String) {
		user(email: $email) {
			name
			avatar
		}
	}
`;

export const GetHeaderProfile = gql`
	query GetHeaderProfile($_id: ID) {
		user(_id: $_id) {
			inGameName
			avatar
		}
	}
`;

export const GetMatchesOverview = gql`
	query GetMatches($_id: ID!) {
		user(_id: $_id) {
			matches {
				_id
				name
				currentTurn {
					_id
				}
				players {
					avatar
				}
			}
		}
	}
`;

export const GetMatchData = gql`
	query GetMatchData($_id: ID!) {
		match(_id: $_id) {
			name
			currentState
			currentTurn {
				_id
				name
			}
			history
		}
	}
`;