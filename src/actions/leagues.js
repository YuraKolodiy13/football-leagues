import {defaultActionCreator} from "./actionCreator";

export const GET_TEAMS_REQUEST = 'GET_TEAMS_REQUEST';
export const GET_TEAMS_REQUEST_SUCCESS = 'GET_TEAMS_REQUEST_SUCCESS';
export const GET_TEAMS_REQUEST_FAILED = 'GET_TEAMS_REQUEST_FAILED';

export const getTeamsRequest = defaultActionCreator(GET_TEAMS_REQUEST, 'data');
export const getTeamsRequestSuccess = defaultActionCreator(GET_TEAMS_REQUEST_SUCCESS, 'data');
export const getTeamsRequestFailed = defaultActionCreator(GET_TEAMS_REQUEST_FAILED, 'error');

export const GET_TEAM_REQUEST = 'GET_TEAM_REQUEST';
export const GET_TEAM_REQUEST_SUCCESS = 'GET_TEAM_REQUEST_SUCCESS';
export const GET_TEAM_REQUEST_FAILED = 'GET_TEAM_REQUEST_FAILED';

export const getTeamRequest = defaultActionCreator(GET_TEAM_REQUEST, 'data');
export const getTeamRequestSuccess = defaultActionCreator(GET_TEAM_REQUEST_SUCCESS, 'data');
export const getTeamRequestFailed = defaultActionCreator(GET_TEAM_REQUEST_FAILED, 'error');

export const GET_TEAM_INFO_REQUEST = 'GET_TEAM_INFO_REQUEST';
export const GET_TEAM_INFO_REQUEST_SUCCESS = 'GET_TEAM_INFO_REQUEST_SUCCESS';
export const GET_TEAM_INFO_REQUEST_FAILED = 'GET_TEAM_INFO_REQUEST_FAILED';

export const getTeamInfoRequest = defaultActionCreator(GET_TEAM_INFO_REQUEST, 'data');
export const getTeamInfoRequestSuccess = defaultActionCreator(GET_TEAM_INFO_REQUEST_SUCCESS, 'data');
export const getTeamInfoRequesttFailed = defaultActionCreator(GET_TEAM_INFO_REQUEST_FAILED, 'error');

export const GET_PLAYER_REQUEST = 'GET_PLAYER_REQUEST';
export const GET_PLAYER_REQUEST_SUCCESS = 'GET_PLAYER_REQUEST_SUCCESS';
export const GET_PLAYER_REQUEST_FAILED = 'GET_PLAYER_REQUEST_FAILED';

export const getPlayerRequest = defaultActionCreator(GET_PLAYER_REQUEST, 'data');
export const getPlayerRequestSuccess = defaultActionCreator(GET_PLAYER_REQUEST_SUCCESS, 'data');
export const getPlayerRequestFailed = defaultActionCreator(GET_PLAYER_REQUEST_FAILED, 'error');

export const GET_TABLE_REQUEST = 'GET_TABLE_REQUEST';
export const GET_TABLE_REQUEST_SUCCESS = 'GET_TABLE_REQUEST_SUCCESS';
export const GET_TABLE_REQUEST_FAILED = 'GET_TABLE_REQUEST_FAILED';

export const getTableRequest = defaultActionCreator(GET_TABLE_REQUEST, 'data');
export const getTableRequestSuccess = defaultActionCreator(GET_TEAM_REQUEST_SUCCESS, 'data');
export const getTableRequestFailed = defaultActionCreator(GET_TABLE_REQUEST_FAILED, 'error');

export const GET_TEAM_NEXT_SCHEDULE_REQUEST = 'GET_TEAM_NEXT_SCHEDULE_REQUEST';
export const GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS = 'GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS';
export const GET_TEAM_NEXT_SCHEDULE_REQUEST_FAILED = 'GET_TEAM_NEXT_SCHEDULE_REQUEST_FAILED';

export const getTeamNextScheduleRequest = defaultActionCreator(GET_TEAM_NEXT_SCHEDULE_REQUEST, 'data');
export const getTeamNextScheduleRequestSuccess = defaultActionCreator(GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS, 'data');
export const getTeamNextScheduleRequestFailed = defaultActionCreator(GET_TEAM_NEXT_SCHEDULE_REQUEST_FAILED, 'error');

export const GET_TEAM_PREV_SCHEDULE_REQUEST = 'GET_TEAM_PREV_SCHEDULE_REQUEST';
export const GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS = 'GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS';
export const GET_TEAM_PREV_SCHEDULE_REQUEST_FAILED = 'GET_TEAM_PREV_SCHEDULE_REQUEST_FAILED';

export const getTeamPrevScheduleRequest = defaultActionCreator(GET_TEAM_PREV_SCHEDULE_REQUEST, 'data');
export const getTeamPrevScheduleRequestSuccess = defaultActionCreator(GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS, 'data');
export const getTeamPrevScheduleRequestFailed = defaultActionCreator(GET_TEAM_PREV_SCHEDULE_REQUEST_FAILED, 'error');

export const GET_GAME_DETAIL_REQUEST = 'GET_GAME_DETAIL_REQUEST';
export const GET_GAME_DETAIL_REQUEST_SUCCESS = 'GET_GAME_DETAIL_REQUEST_SUCCESS';
export const GET_GAME_DETAIL_REQUEST_FAILED = 'GET_GAME_DETAIL_REQUEST_FAILED';

export const getGameDetailRequest = defaultActionCreator(GET_GAME_DETAIL_REQUEST, 'data');
export const getGameDetailRequestSuccess = defaultActionCreator(GET_GAME_DETAIL_REQUEST_SUCCESS, 'data');
export const getGameDetailRequestFailed = defaultActionCreator(GET_GAME_DETAIL_REQUEST_FAILED, 'error');

export const GET_SCHEDULE_REQUEST = 'GET_SCHEDULE_REQUEST';
export const GET_SCHEDULE_REQUEST_SUCCESS = 'GET_SCHEDULE_REQUEST_SUCCESS';
export const GET_SCHEDULE_REQUEST_FAILED = 'GET_SCHEDULE_REQUEST_FAILED';

export const getScheduleRequest = defaultActionCreator(GET_SCHEDULE_REQUEST, 'data');
export const getScheduleRequestSuccess = defaultActionCreator(GET_SCHEDULE_REQUEST_SUCCESS, 'data');
export const getScheduleRequestFailed = defaultActionCreator(GET_SCHEDULE_REQUEST_FAILED, 'error');

export const GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST';
export const GET_COUNTRIES_REQUEST_SUCCESS = 'GET_COUNTRIES_REQUEST_SUCCESS';
export const GET_COUNTRIES_REQUEST_FAILED = 'GET_COUNTRIES_REQUEST_FAILED';

export const getCountriesRequest = defaultActionCreator(GET_COUNTRIES_REQUEST, 'data');
export const getCountriesRequestSuccess = defaultActionCreator(GET_COUNTRIES_REQUEST_SUCCESS, 'data');
export const getCountriesRequestFailed = defaultActionCreator(GET_COUNTRIES_REQUEST_FAILED, 'error');

export const GET_TODAYS_MATCHES_REQUEST = 'GET_TODAYS_MATCHES_REQUEST';
export const GET_TODAYS_MATCHES_REQUEST_SUCCESS = 'GET_TODAYS_MATCHES_REQUEST_SUCCESS';
export const GET_TODAYS_MATCHES_REQUEST_FAILED = 'GET_TODAYS_MATCHES_REQUEST_FAILED';

export const getTodaysMatchesRequest = defaultActionCreator(GET_TODAYS_MATCHES_REQUEST, 'data');
export const getTodaysMatchesRequestSuccess = defaultActionCreator(GET_TODAYS_MATCHES_REQUEST_SUCCESS, 'data');
export const getTodaysMatchesRequestFailed = defaultActionCreator(GET_TODAYS_MATCHES_REQUEST_FAILED, 'error');
