import { all, call, put, takeEvery } from 'redux-saga/effects'

import * as leaguesActions from '../actions/leagues'
import {
  getTableApi,
  getTeamApi,
  getTeamsApi,
  getTeamNextScheduleApi,
  getTeamPrevScheduleApi,
  getGameDetailApi,
  getTeamInfoApi,
  getPlayerApi, getScheduleApi, getCountriesApi, getTodaysMatchesApi, searchUsersApi, getUserRepoApi,
} from "../requests/leagues";
import {getFullDate} from "../helpers/utils";

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
    yield put({type: leaguesActions.GET_TEAM_INFO_REQUEST, data: response.data.data.shortName});
    // yield put({type: leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST, data: response.data.teams[0].idTeam});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_REQUEST_FAILED, error: e.response });
  }
}

export function* getTeamInfo(action) {
  try {
    const response = yield call(getTeamInfoApi, action.data);
    yield put({type: leaguesActions.GET_TEAM_INFO_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_INFO_REQUEST_FAILED, error: e.response });
  }
}

export function* getPlayer(action) {
  try {
    const response = yield call(getPlayerApi, action.data);
    yield put({type: leaguesActions.GET_PLAYER_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_PLAYER_REQUEST_FAILED, error: e.response });
  }
}

export function* getTable(action) {
  try {
    const response = yield call(getTableApi, action.data);
    yield put({type: leaguesActions.GET_TABLE_REQUEST_SUCCESS, data: response.data});
    yield put({type: leaguesActions.GET_SCHEDULE_REQUEST, data: {
        matchday: response.data.data[0].playedGames + 1,
        id: action.data
      }});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TABLE_REQUEST_FAILED, error: e.response });
  }
}

export function* getTeamNextSchedule(action) {
  try {
    const response = yield call(getTeamNextScheduleApi, action.data);
    yield put({type: leaguesActions.GET_TEAM_NEXT_SCHEDULE_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_NEXT_SCHEDULE_REQUEST_FAILED, error: e.response });
  }
}

export function* getTeamPrevSchedule(action) {
  try {
    const response = yield call(getTeamPrevScheduleApi, action.data);
    yield put({type: leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST_FAILED, error: e.response });
  }
}

export function* getGameDetail(action) {
  try {
    const response = yield call(getGameDetailApi, action.data);
    yield put({type: leaguesActions.GET_GAME_DETAIL_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_GAME_DETAIL_REQUEST_FAILED, error: e.response });
  }
}

export function* getSchedule(action) {
  try {
    const response = yield call(getScheduleApi, action.data);
    yield put({type: leaguesActions.GET_SCHEDULE_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_SCHEDULE_REQUEST_FAILED, error: e.response });
  }
}

export function* getCountries() {
  try {
    const response = yield call(getCountriesApi);
    const countries = {};
    response.data.data.map((item) => {
      if(countries[item.area.id]){
        countries[item.area.id] = [...countries[item.area.id], item];
      }else{
        countries[item.area.id] = [item];
      }
      return null;
    });
    yield put({type: leaguesActions.GET_COUNTRIES_REQUEST_SUCCESS, data: [response.data.data, Object.values(countries)]});
  } catch (e) {
    yield put({ type: leaguesActions.GET_COUNTRIES_REQUEST_FAILED, error: e.response });
  }
}

export function* getTodaysMatches(action) {
  try {
    const today = getFullDate(new Date());
    const response = yield call(getTodaysMatchesApi, {today: today, status: action.data});

    const matches = {};
    response.data.data.map((item) => {
      const match = {
        ...item,
        summary: [...item.goals, ...item.substitutions, ...item.bookings].sort((a, b) => a.minute - b.minute)
      };
      if(matches[item.competition.id]){
        matches[item.competition.id] = [...matches[item.competition.id], match];
      }else{
        matches[item.competition.id] = [match];
      }
      return null;
    });

    yield put({type: leaguesActions.GET_TODAYS_MATCHES_REQUEST_SUCCESS, data: [matches, action.data]});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TODAYS_MATCHES_REQUEST_FAILED, error: e.response });
  }
}

export function* searchUsers(action) {
  try {
    const response = yield call(searchUsersApi, action.data);
    yield put({type: leaguesActions.SEARCH_USERS_SUCCESS, data: response.data});

    yield put({type: leaguesActions.GET_USER_REPO, data: response.data.login})
  } catch (e) {
    yield put({ type: leaguesActions.SEARCH_USERS_FAILED, error: e.response });
  }
}

export function* getUserRepo(action) {
  try {
    const response = yield call(getUserRepoApi, action.data);
    yield put({type: leaguesActions.GET_USER_REPO_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_USER_REPO_FAILED, error: e.response });
  }
}

export default all([
  takeEvery(leaguesActions.GET_TEAMS_REQUEST, getTeams),
  takeEvery(leaguesActions.GET_TEAM_REQUEST, getTeam),
  takeEvery(leaguesActions.GET_TEAM_INFO_REQUEST, getTeamInfo),
  takeEvery(leaguesActions.GET_PLAYER_REQUEST, getPlayer),
  takeEvery(leaguesActions.GET_TABLE_REQUEST, getTable),
  takeEvery(leaguesActions.GET_TEAM_NEXT_SCHEDULE_REQUEST, getTeamNextSchedule),
  takeEvery(leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST, getTeamPrevSchedule),
  takeEvery(leaguesActions.GET_GAME_DETAIL_REQUEST, getGameDetail),
  takeEvery(leaguesActions.GET_SCHEDULE_REQUEST, getSchedule),
  takeEvery(leaguesActions.GET_COUNTRIES_REQUEST, getCountries),
  takeEvery(leaguesActions.GET_TODAYS_MATCHES_REQUEST, getTodaysMatches),
  takeEvery(leaguesActions.SEARCH_USERS, searchUsers),
  takeEvery(leaguesActions.GET_USER_REPO, getUserRepo),
])