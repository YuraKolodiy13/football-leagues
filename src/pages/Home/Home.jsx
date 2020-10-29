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
import './Home.scss'
import {useHistory} from "react-router-dom";

const Home = (props) => {
  const dispatch = useDispatch();
  const table = useSelector(state => state.leagues.table);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTableRequest());
  }, []); // eslint-disable-line

  return (
    <div className='home'>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>name</TableCell>
              <TableCell>played</TableCell>
              <TableCell>win</TableCell>
              <TableCell>draw</TableCell>
              <TableCell>loss</TableCell>
              <TableCell>goals</TableCell>
              <TableCell>points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((row, index) => (
              <TableRow key={row.name} onClick={() => history.push(`/team/${row.name}`)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.played}</TableCell>
                <TableCell>{row.win}</TableCell>
                <TableCell>{row.draw}</TableCell>
                <TableCell>{row.loss}</TableCell>
                <TableCell>{row.goalsfor}:{row.goalsagainst}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default Home;