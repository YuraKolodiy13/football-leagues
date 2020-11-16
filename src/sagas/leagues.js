import { all, call, put, takeEvery } from 'redux-saga/effects'

import * as leaguesActions from '../actions/leagues'
import {
  getTableApi,
  getTeamApi,
  getTeamsApi,
  getTeamNextScheduleApi,
  getTeamPrevScheduleApi,
  getTeamInfoApi,
  getPlayerApi,
  getScheduleApi,
  getCountriesApi,
  getTodaysMatchesApi,
  searchUsersApi,
  getUserRepoApi,
  getScorersApi,
  getHead2HeadApi, getCountriesBordersApi, parseRssDataApi, getPlayerInfoApi, getPlayerMatchesApi,
} from "../requests/leagues";

const leagues_ids = [2020, 2009, 2035, 2040, 2047, 2049, 2050, 2016, 2021, 2057, 2146, 2018, 2001, 2007, 2031, 2015, 2002,
  2004, 2131, 2128, 2127, 2125, 2019, 2121, 2116, 2115, 2114, 2003, 2107, 2105, 2100, 2017, 2095, 2094, 2137, 2084, 2014, 2077,
  2073, 2071, 2070, 2064, 2060];

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
    yield put({type: leaguesActions.GET_TEAM_NEXT_SCHEDULE_REQUEST, data: response.data.data.id});
    yield put({type: leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST, data: response.data.data.id});
    // yield put({type: leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST, data: response.data.teams[0].idTeam});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_REQUEST_FAILED, error: e.response });
  }
}

export function* getTeamInfo(action) {
  try {
    const response = yield call(getTeamInfoApi, action.data);
    const team = response.data.teams ? response.data.teams[0] : {};
    yield put({type: leaguesActions.GET_TEAM_INFO_REQUEST_SUCCESS, data: team});
    if(team.strRSS){
      yield put({type: leaguesActions.PARSE_RSS_DATA, data: team.strRSS})
    }
  } catch (e) {
    yield put({ type: leaguesActions.GET_TEAM_INFO_REQUEST_FAILED, error: e.response });
  }
}

export function* getPlayer(action) {
  try {
    const response = yield call(getPlayerApi, action.data);
    yield put({type: leaguesActions.GET_PLAYER_REQUEST_SUCCESS, data: response.data});
    yield put({type: leaguesActions.GET_PLAYER_MATCHES_REQUEST, data: action.data});
    yield put({type: leaguesActions.GET_PLAYER_INFO_REQUEST, data: response.data.name})
  } catch (e) {
    yield put({ type: leaguesActions.GET_PLAYER_REQUEST_FAILED, error: e.response });
  }
}

export function* getPlayerMatches(action) {
  try {
    const response = yield call(getPlayerMatchesApi, action.data);
    yield put({type: leaguesActions.GET_PLAYER_MATCHES_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_PLAYER_MATCHES_REQUEST_FAILED, error: e.response });
  }
}

export function* getPlayerInfo(action) {
  try {
    const response = yield call(getPlayerInfoApi, action.data);
    yield put({type: leaguesActions.GET_PLAYER_INFO_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_PLAYER_INFO_REQUEST_FAILED, error: e.response });
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
      if(!leagues_ids.includes(item.id)) return null;
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
    const response = yield call(getTodaysMatchesApi, {date: action.data.date, status: action.data.type});

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

    yield put({type: leaguesActions.GET_TODAYS_MATCHES_REQUEST_SUCCESS, data: [matches, action.data.type]});
  } catch (e) {
    yield put({ type: leaguesActions.GET_TODAYS_MATCHES_REQUEST_FAILED, error: e.response });
  }
}

export function* getScorers(action) {
  try {
    const response = yield call(getScorersApi, action.data);
    yield put({type: leaguesActions.GET_SCORERS_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_SCORERS_REQUEST_FAILED, error: e.response });
  }
}

export function* getHead2Head(action) {
  try {
    const response = yield call(getHead2HeadApi, action.data);
    yield put({type: leaguesActions.GET_HEAD2HEAD_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_HEAD2HEAD_REQUEST_FAILED, error: e.response });
  }
}

export function* parseRssData(action) {
  try {
    const response = yield call(parseRssDataApi, action.data);
    yield put({type: leaguesActions.PARSE_RSS_DATA_SUCCESS, data: response});
  } catch (e) {
    yield put({ type: leaguesActions.PARSE_RSS_DATA_FAILED, error: e.response });
  }
}







// for test
export function* getCountriesBorders(action) {
  try {
    const response = yield call(getCountriesBordersApi, action.data);
    yield put({type: leaguesActions.GET_COUNTRIES_BORDERS_REQUEST_SUCCESS, data: response.data});
  } catch (e) {
    yield put({ type: leaguesActions.GET_COUNTRIES_BORDERS_REQUEST_FAILED, error: e.response });
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
  takeEvery(leaguesActions.GET_PLAYER_MATCHES_REQUEST, getPlayerMatches),
  takeEvery(leaguesActions.GET_PLAYER_INFO_REQUEST, getPlayerInfo),
  takeEvery(leaguesActions.GET_TABLE_REQUEST, getTable),
  takeEvery(leaguesActions.GET_TEAM_NEXT_SCHEDULE_REQUEST, getTeamNextSchedule),
  takeEvery(leaguesActions.GET_TEAM_PREV_SCHEDULE_REQUEST, getTeamPrevSchedule),
  takeEvery(leaguesActions.GET_SCHEDULE_REQUEST, getSchedule),
  takeEvery(leaguesActions.GET_COUNTRIES_REQUEST, getCountries),
  takeEvery(leaguesActions.GET_TODAYS_MATCHES_REQUEST, getTodaysMatches),
  takeEvery(leaguesActions.GET_SCORERS_REQUEST, getScorers),
  takeEvery(leaguesActions.GET_HEAD2HEAD_REQUEST, getHead2Head),
  takeEvery(leaguesActions.PARSE_RSS_DATA, parseRssData),




  takeEvery(leaguesActions.GET_COUNTRIES_BORDERS_REQUEST, getCountriesBorders),
  takeEvery(leaguesActions.SEARCH_USERS, searchUsers),
  takeEvery(leaguesActions.GET_USER_REPO, getUserRepo),
])