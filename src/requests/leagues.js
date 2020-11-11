import service from './service';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/proxy/' : '/proxy/';

const API_URL_2 = 'https://www.thesportsdb.com/api/v1/json/1/';
const API_URL_3 = 'http://api.football-data.org/v2/';
// const API_URL = 'http://api.football-data.org/v2/';


export const getTeamsApi = () => {
  return service.get(
    `${API_URL}fd/competitions/2021/teams`,
  )
};

export const getTeamApi = (team_id) => {
  return service.get(
    `${API_URL}fd/teams/${team_id}`,
  )
};

export const getTeamInfoApi = (team) => {
  return service.get(
    `${API_URL_2}searchteams.php?t=${team}`,
  )
};

export const getPlayerApi = (player) => {
  return service.get(
    `${API_URL_2}searchplayers.php?p=${player}`,
  )
};

export const getTableApi = (id) => {
  return service.get(
    `${API_URL}fd/competitions/${id}/table`,
  )
};

export const getScheduleApi = ({matchday, id}) => {
  return service.get(
    `${API_URL}fd/competitions/${id}/matches?stage=REGULAR_SEASON&matchday=${matchday}`,
  )
};

export const getTeamNextScheduleApi = (team_id) => {
  return service.get(
    `${API_URL_2}eventsnext.php?id=${team_id}`,
  )
};

export const getTeamPrevScheduleApi = (team_id) => {
  return service.get(
    `${API_URL_2}eventslast.php?id=${team_id}`,
  )
};

export const getCountriesApi = () => {
  return service.get(
    `${API_URL}fd/competitions?areas=2077`,
  )
};

export const getTodaysMatchesApi = ({date, status}) => {
  return service.get(
    `${API_URL}fd/matches?dateFrom=${date}&dateTo=${date}&status=${status}`,
  )
};

export const getScorersApi = (league_id) => {
  return axios.get(
    `${API_URL_3}competitions/${league_id}/scorers`, {
      headers: {
        'X-Auth-Token': '31336b5c4c164aefb58d709315a65f81'
      },
    }
  )
};

export const searchUsersApi = (user) => {
  return service.get(
    `https://api.github.com/users/${user}`,
  )
};

export const getUserRepoApi = (user) => {
  return service.get(
    `https://api.github.com/users/${user}/repos`,
  )
};