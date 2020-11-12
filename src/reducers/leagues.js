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
  GET_SCHEDULE_REQUEST_SUCCESS,
  GET_COUNTRIES_REQUEST_SUCCESS,
  GET_TODAYS_MATCHES_REQUEST_SUCCESS,
  SEARCH_USERS_SUCCESS,
  GET_USER_REPO_SUCCESS,
  GET_TABLE_REQUEST_FAILED,
  GET_TODAYS_MATCHES_REQUEST,
  GET_SCORERS_REQUEST_SUCCESS,
  GET_SCORERS_REQUEST_FAILED,
  GET_HEAD2HEAD_REQUEST_SUCCESS,
  GET_HEAD2HEAD_REQUEST_FAILED,
  GET_TABLE_REQUEST,
  GET_COUNTRIES_BORDERS_REQUEST_SUCCESS, GET_COUNTRIES_BORDERS_REQUEST
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
  scorers: [],
  matches: {},
  player: {},
  head2head: {},
  loading: false,
  user: {},
  repos: [],
  features: []
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
        teamInfo: action.data,
        loading: false
      };

    case GET_PLAYER_REQUEST:
    case GET_TABLE_REQUEST:
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
        table: action.data.data,
        loading: false
      };
    case GET_TABLE_REQUEST_FAILED:
      return {
        ...state,
        table: []
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

    case GET_TODAYS_MATCHES_REQUEST:
      return {
        ...state,
        matches: {
          ...state.matches,
          loading: action.data.type === 'LIVE' ? 0 : state.matches.loading
        }
      };

    case GET_TODAYS_MATCHES_REQUEST_SUCCESS:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.data[1]]: action.data[0],
          loading: state.matches.loading ? state.matches.loading + 1 : 1
        }
      };

    case GET_SCORERS_REQUEST_SUCCESS:
      return {
        ...state,
        scorers: action.data.scorers
      };


    case GET_SCORERS_REQUEST_FAILED:
      return {
        ...state,
        scorers: []
      };

    case GET_HEAD2HEAD_REQUEST_SUCCESS:
      return {
        ...state,
        head2head: action.data.head2head
      };

    case GET_HEAD2HEAD_REQUEST_FAILED:
      return {
        ...state,
        head2head: {}
      };

    case GET_COUNTRIES_BORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_COUNTRIES_BORDERS_REQUEST_SUCCESS:
      return {
        ...state,
        features: action.data.features,
        loading: false
      };





    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        user: action.data
      };

    case GET_USER_REPO_SUCCESS:
      return {
        ...state,
        repos: action.data
      };

    default:
      return state;
  }
}