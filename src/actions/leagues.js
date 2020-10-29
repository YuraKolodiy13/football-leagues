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

export const GET_TABLE_REQUEST = 'GET_TABLE_REQUEST';
export const GET_TABLE_REQUEST_SUCCESS = 'GET_TABLE_REQUEST_SUCCESS';
export const GET_TABLE_REQUEST_FAILED = 'GET_TABLE_REQUEST_FAILED';

export const getTableRequest = defaultActionCreator(GET_TABLE_REQUEST, 'data');
export const getTableRequestSuccess = defaultActionCreator(GET_TEAM_REQUEST_SUCCESS, 'data');
export const getTableRequestFailed = defaultActionCreator(GET_TABLE_REQUEST_FAILED, 'error');