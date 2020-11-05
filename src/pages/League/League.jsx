import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableRequest} from "../../actions/leagues";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './League.scss'
import {Link} from "react-router-dom";

const League = (props) => {
  const dispatch = useDispatch();
  const table = useSelector(state => state.leagues.table);
  const schedule = useSelector(state => state.leagues.schedule);

  useEffect(() => {
    dispatch(getTableRequest(props.match.params.id));
  }, [props.match.params.id]); // eslint-disable-line

  return (
    <div className='home'>
      {!!table.length
        ? <>
          <TableContainer component={Paper} className='main-table'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell className='team-name'>Team</TableCell>
                  <TableCell>MP</TableCell>
                  <TableCell>W</TableCell>
                  <TableCell>D</TableCell>
                  <TableCell>L</TableCell>
                  <TableCell className='team-scores'>G</TableCell>
                  <TableCell>Pts</TableCell>
                  <TableCell className='team-form'>Form</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row, index) => (
                  <TableRow key={row.team.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='team-name'>
                      <Link to={`/team/${row.team.id}`} >
                        <span style={{backgroundImage: `url(${row.team.crestUrl})`}}/>
                        {row.team.name}
                      </Link>
                    </TableCell>
                    <TableCell>{row.playedGames}</TableCell>
                    <TableCell>{row.won}</TableCell>
                    <TableCell>{row.draw}</TableCell>
                    <TableCell>{row.lost}</TableCell>
                    <TableCell className='team-scores'>{row.goalsFor}:{row.goalsAgainst}</TableCell>
                    <TableCell>{row.points}</TableCell>
                    <TableCell className='team-form'>{row.form && row.form.split(',').map(item =>
                      <span className={`form form-${item}`}>{item}</span>
                    )}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <hr/>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Guest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {new Date(row.utcDate + '').toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="right">
                      <Link to={`/team/${row.homeTeam.id}`} >
                        <span style={{backgroundImage: `url(https://crests.football-data.org/${row.homeTeam.id}.svg)`}}/>
                        {row.homeTeam.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {row.status === 'SCHEDULED'
                        ? '- : -'
                        : <>
                          {row.score.fullTime.homeTeam} : {row.score.fullTime.awayTeam}
                        </>
                      }
                    </TableCell>
                    <TableCell>
                      <Link to={`/team/${row.awayTeam.id}`} >
                        {row.awayTeam.name}
                        <span style={{backgroundImage: `url(https://crests.football-data.org/${row.awayTeam.id}.svg)`}}/>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        : <p>no info about this league</p>
      }

    </div>
  )
};

export default League;