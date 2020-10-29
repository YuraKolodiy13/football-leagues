import {GET_TABLE_REQUEST_SUCCESS, GET_TEAM_REQUEST_SUCCESS, GET_TEAMS_REQUEST_SUCCESS} from "../actions/leagues";

const initialState = {
  teams: [],
  team: [],
  table: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS_REQUEST_SUCCESS:
      return {
        ...state,
        teams: action.data.teams
      };

    case GET_TEAM_REQUEST_SUCCESS:
      return {
        ...state,
        team: action.data.teams[0]
      };

    case GET_TABLE_REQUEST_SUCCESS:
      return {
        ...state,
        table: action.data.table
      };

    default:
      return state;
  }
}