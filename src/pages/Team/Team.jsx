import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTeamRequest} from "../../actions/leagues";

import './Team.scss'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link, useHistory} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Loader from "../../components/Loader/Loader";

const Team = (props) => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.leagues.team);
  const teamInfo = useSelector(state => state.leagues.teamInfo);
  const loading = useSelector(state => state.leagues.loading);
  const teamNextEvents = useSelector(state => state.leagues.teamNextEvents);
  const teamPrevEvents = useSelector(state => state.leagues.teamPrevEvents);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTeamRequest(props.match.params.id));
  }, []); // eslint-disable-line

  return (
    <div className='team'>
      <ul className='breadcrumbs'>
        <li><Link to='/'>home</Link></li>
        {team.activeCompetitions && (
          <li><Link to={`/league/${team.activeCompetitions[0].id}`}>{team.activeCompetitions[0].name}</Link></li>
        )}
        <li>{team.name}</li>
      </ul>

      {loading
        ? <Loader/>
        : <>
            {teamInfo.strTeam && (
              <>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strTeamBanner})`}}/>
                <h1>{teamInfo.strTeam}</h1>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strStadiumThumb})`}}/>
                <p>{teamInfo.strStadiumDescription}</p>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strTeamFanart4})`}}/>
                <p>{teamInfo.strDescriptionEN}</p>
              </>
            )}

            <h2>squad</h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>dateOfBirth</TableCell>
                    <TableCell>nationality</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.squad && team.squad.map((row, index) => (
                    <TableRow key={row.id} onClick={() => history.push(`/player/${row.name}`)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>
                        {new Date(row.dateOfBirth + '').toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</TableCell>
                      <TableCell>{row.nationality}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <h2>next games</h2>
            {teamNextEvents && teamNextEvents.map(item =>
              <div key={item.idEvent}>
                {item.strEvent}
              </div>
            )}

            <h2>prev games</h2>
            {teamPrevEvents && teamPrevEvents.map(item =>
              <div key={item.idEvent}>
                {item.strHomeTeam}
                {item.intHomeScore}:{item.intAwayScore}
                {item.strAwayTeam}
              </div>
            )}
          </>

      }


    </div>
  )
};

export default Team;