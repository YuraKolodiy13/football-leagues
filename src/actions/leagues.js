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

export const GET_SCORERS_REQUEST = 'GET_SCORERS_REQUEST';
export const GET_SCORERS_REQUEST_SUCCESS = 'GET_SCORERS_REQUEST_SUCCESS';
export const GET_SCORERS_REQUEST_FAILED = 'GET_SCORERS_REQUEST_FAILED';

export const getScorersRequest = defaultActionCreator(GET_SCORERS_REQUEST, 'data');
export const getScorersRequestSuccess = defaultActionCreator(GET_SCORERS_REQUEST_SUCCESS, 'data');
export const getScorersRequestFailed = defaultActionCreator(GET_SCORERS_REQUEST_FAILED, 'error');

export const GET_HEAD2HEAD_REQUEST = 'GET_HEAD2HEAD_REQUEST';
export const GET_HEAD2HEAD_REQUEST_SUCCESS = 'GET_HEAD2HEAD_REQUEST_SUCCESS';
export const GET_HEAD2HEAD_REQUEST_FAILED = 'GET_HEAD2HEAD_REQUEST_FAILED';

export const getHead2HeadRequest = defaultActionCreator(GET_HEAD2HEAD_REQUEST, 'data');
export const getHead2HeadRequestSuccess = defaultActionCreator(GET_HEAD2HEAD_REQUEST_SUCCESS, 'data');
export const getHead2HeadRequestFailed = defaultActionCreator(GET_HEAD2HEAD_REQUEST_FAILED, 'error');

export const PARSE_RSS_DATA = 'PARSE_RSS_DATA';
export const PARSE_RSS_DATA_SUCCESS = 'PARSE_RSS_DATA_SUCCESS';
export const PARSE_RSS_DATA_FAILED = 'PARSE_RSS_DATA_FAILED';

export const parseRssDataRequest = defaultActionCreator(PARSE_RSS_DATA, 'data');
export const parseRssDataRequestSuccess = defaultActionCreator(PARSE_RSS_DATA_SUCCESS, 'data');
export const parseRssDataRequestFailed = defaultActionCreator(PARSE_RSS_DATA_FAILED, 'error');




// for test
export const GET_COUNTRIES_BORDERS_REQUEST = 'GET_COUNTRIES_BORDERS_REQUEST';
export const GET_COUNTRIES_BORDERS_REQUEST_SUCCESS = 'GET_COUNTRIES_BORDERS_REQUEST_SUCCESS';
export const GET_COUNTRIES_BORDERS_REQUEST_FAILED = 'GET_COUNTRIES_BORDERS_REQUEST_FAILED';

export const getCountriesBordersRequest = defaultActionCreator(GET_COUNTRIES_BORDERS_REQUEST, 'data');
export const getCountriesBordersRequestSuccess = defaultActionCreator(GET_COUNTRIES_BORDERS_REQUEST_SUCCESS, 'data');
export const getCountriesBordersRequestFailed = defaultActionCreator(GET_COUNTRIES_BORDERS_REQUEST_FAILED, 'error');

export const SEARCH_USERS = 'SEARCH_USERS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILED = 'SEARCH_USERS_FAILED';

export const searchUsers = defaultActionCreator(SEARCH_USERS, 'data');
export const searchUsersSuccess = defaultActionCreator(SEARCH_USERS_SUCCESS, 'data');
export const searchUsersFailed = defaultActionCreator(SEARCH_USERS_FAILED, 'error');

export const GET_USER_REPO = 'GET_USER_REPO';
export const GET_USER_REPO_SUCCESS = 'GET_USER_REPO_SUCCESS';
export const GET_USER_REPO_FAILED = 'GET_USER_REPO_FAILED';

export const getUserRepo = defaultActionCreator(GET_USER_REPO, 'data');
export const getUserRepoSuccess = defaultActionCreator(GET_USER_REPO_SUCCESS, 'data');
export const getUserRepoFailed = defaultActionCreator(GET_USER_REPO_FAILED, 'error');
