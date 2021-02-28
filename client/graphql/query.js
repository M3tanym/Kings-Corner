import {gql} from "@apollo/client";

/*
export const GetInfoFromSearch = gql`
	query GetInfoFromSearch($query: String!) {
		...user(name: $query) {
			userData
		}
		...user(inGameName: $query) {
			userData
		}
		...user(email: $query) {
			userData
		}
		...match(name: $query) {
			__typename
		}
	}
	fragment userData() {
		__typename
		name
		avatar
	}
`;
 */

export const GetHeaderProfile = gql`
	query GetHeaderProfile($_id: ID) {
		user(_id: $_id) {
			inGameName
			avatar
		}
	}
`;

export const GetTraditionalProfile = gql`
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
			activeMatches {
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

export const GetMatchHistory = gql`
	query GetMatchHistory($_id: ID!) {
		user(_id: $_id) {
			finishedMatches {
				_id
				name
				players {
					avatar
				}
			}
		}
	}
`;

export const GetOwnedItems = gql`
	query GetOwnedItems($_id: ID!) {
		user(_id: $_id) {
			items {
				name
				description
			}
		}
	}
`;