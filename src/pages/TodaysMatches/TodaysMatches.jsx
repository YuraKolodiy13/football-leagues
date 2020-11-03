import React, {useEffect} from 'react';
import {getTodaysMatchesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";

const TodaysMatches = () => {

  const dispatch = useDispatch();
  const matches = useSelector(state => state.leagues.matches);

  useEffect(() => {
    dispatch(getTodaysMatchesRequest('LIVE'));
    dispatch(getTodaysMatchesRequest('SCHEDULED'));
    dispatch(getTodaysMatchesRequest('FINISHED'));
  }, []); // eslint-disable-line

  return (
    <div>
      <h2>Live</h2>
      <ul>
        {matches.LIVE && Object.values(matches.LIVE).map(item =>
          <li>
            <span>{item.homeTeam.name}</span>:
            <span>{item.awayTeam.name}</span>
          </li>
        )}
      </ul>
      <h2>Scheduled</h2>
      <ul>
        {matches.SCHEDULED && Object.values(matches.SCHEDULED).map(item =>
          <li>
            <span>{item.homeTeam.name}</span>:
            <span>{item.awayTeam.name}</span>
          </li>
        )}
      </ul>
      <h2>Finished</h2>
      <ul>
        {matches.FINISHED && Object.values(matches.FINISHED).map(item =>
          <li>
            <span>{item.homeTeam.name}</span>:
            <span>{item.awayTeam.name}</span>
          </li>
        )}
      </ul>
    </div>
  )
};

export default TodaysMatches;