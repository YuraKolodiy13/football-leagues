import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTeamRequest} from "../../actions/leagues";

import './Team.scss'

const Team = (props) => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.leagues.team);

  useEffect(() => {
    dispatch(getTeamRequest(props.match.params.id));
  }, []); // eslint-disable-line

  return (
    <div className='team'>
      <div className="banner" style={{backgroundImage: `url(${team.strTeamBanner})`}}/>
      <h1>{team.strTeam}</h1>
      <div className="banner" style={{backgroundImage: `url(${team.strStadiumThumb})`}}/>
      <p>{team.strStadiumDescription}</p>
      <div className="banner" style={{backgroundImage: `url(${team.strTeamFanart4})`}}/>
      <p>{team.strDescriptionEN}</p>
    </div>
  )
};

export default Team;