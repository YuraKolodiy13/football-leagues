import { all, call, put, takeEvery } from 'redux-saga/effects'

import * as leaguesActions from '../actions/leagues'
import {
  getTableApi,
  getTeamApi, getTeamsApi,
} from "../requests/leagues";

export function* getTeams() {
  try {
    const response = yield call(getTeamsApi);
    yield put({type: leaguesActions.GET_TEAMS_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAMS_REQUEST_FAILED, error: e.response });
  }
}

export function* getTeam(action) {
  try {
    const response = yield call(getTeamApi, action.data);
    yield put({type: leaguesActions.GET_TEAM_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_REQUEST_FAILED, error: e.response });
  }
}

export function* getTable() {
  try {
    const response = yield call(getTableApi);
    yield put({type: leaguesActions.GET_TABLE_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TABLE_REQUEST_FAILED, error: e.response });
  }
}

export default all([
  takeEvery(leaguesActions.GET_TEAMS_REQUEST, getTeams),
  takeEvery(leaguesActions.GET_TEAM_REQUEST, getTeam),
  takeEvery(leaguesActions.GET_TABLE_REQUEST, getTable),
])