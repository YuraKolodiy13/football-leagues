import service from './service';
import Parser from 'rss-parser';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/proxy/' : '/proxy/';

const API_URL_2 = 'https://www.thesportsdb.com/api/v1/json/1/';
const API_URL_3 = 'https://api.football-data.org/v2/';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const parser = new Parser();


export const getTeamsApi = () => {
  return service.get(
    `${API_URL}fd/competitions/2021/teams`,
  )
};

export const getTeamApi = (team_id) => {
  return service.getWithToken(
    `${API_URL_3}teams/${team_id}`,
  )
};

export const getTeamInfoApi = (team) => {
  return service.get(
    `${API_URL_2}searchteams.php?t=${team}`,
  )
};

export const getPlayerApi = (player_id) => {
  return service.getWithToken(
    `${API_URL_3}players/${player_id}`,
  )
};

export const getPlayerMatchesApi = (player_id) => {
  return service.getWithToken(
    `${API_URL_3}players/${player_id}/matches`,
  )
};

export const getPlayerInfoApi = (player) => {
  return service.get(
    `${API_URL_2}searchplayers.php?p=${player}`,
  )
};

export const getTableApi = (id) => {
  return service.getWithToken(
    `${API_URL_3}competitions/${id}/standings?standingType=TOTAL`,
  )
};

export const getScheduleApi = ({matchday, id}) => {
  return service.getWithToken(
    `${API_URL_3}competitions/${id}/matches?stage=REGULAR_SEASON&matchday=${matchday}`,
  )
};

export const getTeamNextScheduleApi = (team_id) => {
  return service.getWithToken(
    `${API_URL_3}teams/${team_id}/matches?status=SCHEDULED`,
  )
};

export const getTeamPrevScheduleApi = (team_id) => {
  return service.getWithToken(
    `${API_URL_3}teams/${team_id}/matches?status=FINISHED`,
  )
};

export const getCountriesApi = () => {
  return service.getWithToken(
    `${API_URL_3}competitions`,
  )
};

export const getTodaysMatchesApi = ({date, status}) => {
  return service.getWithToken(
    `${API_URL_3}matches?dateFrom=${date}&dateTo=${date}&status=${status}`,
  )
};

export const getScorersApi = (league_id) => {
  return service.getWithToken(
    `${API_URL_3}competitions/${league_id}/scorers`,
  )
};

export const getHead2HeadApi = (match_id) => {
  return service.getWithToken(
    `${API_URL_3}matches/${match_id}`,
  )
};

export const parseRssDataApi = (rss) => {
  return parser.parseURL(`${CORS_PROXY}${rss}`);
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

export const getCountriesBordersApi = () => {
  return service.get(
    `https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson`,
  )
};