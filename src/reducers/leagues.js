import {
  GET_TABLE_REQUEST_SUCCESS,
  GET_TEAM_REQUEST_SUCCESS,
  GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS,
  GET_TEAMS_REQUEST_SUCCESS,
  GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS,
  GET_TEAM_INFO_REQUEST_SUCCESS,
  GET_TEAM_REQUEST,
  GET_PLAYER_REQUEST_SUCCESS,
  GET_PLAYER_REQUEST,
  GET_SCHEDULE_REQUEST_SUCCESS, GET_COUNTRIES_REQUEST_SUCCESS, GET_TODAYS_MATCHES_REQUEST_SUCCESS
} from "../actions/leagues";

const initialState = {
  teams: [],
  team: [],
  teamInfo: {},
  table: [],
  schedule: [],
  teamNextEvents: [],
  teamPrevEvents: [],
  popularLeagues: [],
  allLeagues: [],
  matches: {},
  player: {},
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS_REQUEST_SUCCESS:
      return {
        ...state,
        teams: action.data.data
      };

    case GET_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TEAM_REQUEST_SUCCESS:
      return {
        ...state,
        team: action.data.data
      };

    case GET_TEAM_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        teamInfo: action.data.teams ? action.data.teams[0] : {},
        loading: false
      };

    case GET_PLAYER_REQUEST:
      return {
        ...state,
        loading: true
      };

    case GET_PLAYER_REQUEST_SUCCESS:
      return {
        ...state,
        player: action.data.player ? action.data.player[0] : {},
        loading: false
      };

    case GET_TABLE_REQUEST_SUCCESS:
      return {
        ...state,
        table: action.data.data
      };

    case GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS:
      return {
        ...state,
        teamNextEvents: action.data.events
      };

    case GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS:
      return {
        ...state,
        teamPrevEvents: action.data.results
      };

    case GET_SCHEDULE_REQUEST_SUCCESS:
      return {
        ...state,
        schedule: action.data.data
      };

    case GET_COUNTRIES_REQUEST_SUCCESS:
      return {
        ...state,
        allLeagues: action.data[0],
        popularLeagues: action.data[1]
      };

    case GET_TODAYS_MATCHES_REQUEST_SUCCESS:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.data[1]]: action.data[0]
        }
      };

    default:
      return state;
  }
}