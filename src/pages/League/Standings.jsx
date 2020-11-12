import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";

const Standings = ({table}) => {
  return (
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
            <TableRow key={index} className={`position-${row.position} ${row.group ? 'group' : ''}`} data-group={row.group}>
              <TableCell>{row.position}</TableCell>
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
              <TableCell className='team-form'>{row.form && row.form.split(',').map((item, index) =>
                <span className={`form form-${item}`} key={index}>{item}</span>
              )}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default Standings;