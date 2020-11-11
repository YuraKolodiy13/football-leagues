import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import {useSelector} from "react-redux";

const Schedule = () => {

  const schedule = useSelector(state => state.leagues.schedule);

  return (
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
  )
};

export default Schedule;