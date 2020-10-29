import service from './service';

const API_URL = 'https://www.thesportsdb.com/api/v1/json/1/';

export const getTeamsApi = () => {
  return service.get(
    `${API_URL}search_all_teams.php?l=English%20Premier%20League`,
  )
};

export const getTeamApi = (team) => {
  return service.get(
    `${API_URL}searchteams.php?t=${team}`,
  )
};

export const getTableApi = () => {
  return service.get(
    `${API_URL}lookuptable.php?l=4328&s=2020-2021`,
  )
};