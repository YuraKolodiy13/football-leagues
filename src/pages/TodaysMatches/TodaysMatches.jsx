import React, {useEffect, useState} from 'react';
import {getTodaysMatchesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './TodaysMatches.scss'
import unknownFlag from '../../assets/images/unknown_flag.png'
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MatchDetailModal from "./MatchDetailModal/MatchDetailModal";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import {getFullDate} from "../../helpers/utils";
import TabPanel from "../../components/TabPanel/TabPanel";

const TodaysMatches = () => {

  const dispatch = useDispatch();
  const matches = useSelector(state => state.leagues.matches);
  const [value, setValue] = useState(0);
  const [isMatchDetailModalOpen, setIsMatchDetailModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState({});
  const [currentDate, setCurrentDate] = useState(getFullDate(new Date()));

  useEffect(() => {
    dispatch(getTodaysMatchesRequest({type: 'LIVE', date: currentDate}));
    dispatch(getTodaysMatchesRequest({type: 'SCHEDULED', date: currentDate}));
    dispatch(getTodaysMatchesRequest({type: 'FINISHED', date: currentDate}));
  }, []); // eslint-disable-line

  const viewMatch = (match) => {
    setCurrentMatch(match);
    setIsMatchDetailModalOpen(true);
  };

  const getMatchesByDate = (date) => {
    setCurrentDate(date);
    dispatch(getTodaysMatchesRequest({type: 'LIVE', date}));
    dispatch(getTodaysMatchesRequest({type: 'SCHEDULED', date}));
    dispatch(getTodaysMatchesRequest({type: 'FINISHED', date}));
  };

  const getWinnerClass = (item, type) => {
    if(item.score.winner === type && item.status === 'FINISHED') return 'winner';
  };

  const getMatches = (item, type) => {
    if(!item || !Object.values(item).length) return <p>no {type} matches now</p>;
    return(
      <>
        {item && Object.values(item).map((el, index) =>
          <li key={index}>
            <p>
              <span className='icon'
                style={{backgroundImage: `url(${el[0].competition.area.ensignUrl ? el[0].competition.area.ensignUrl : unknownFlag})`}}
              />
              <b>{el[0].competition.area.name}: </b>
              <Link to={`/league/${el[0].competition.id}`}>{el[0].competition.name}</Link>
            </p>
            <ul>
              {el.map(item =>
                <li key={item.id} onClick={() => viewMatch(item)}>
                  <span className='matchTime'>
                    {('0' + new Date(item.utcDate + '').getHours()).slice(-2)}:
                    {('0' + new Date(item.utcDate + '').getMinutes()).slice(-2)}
                  </span>
                  <span className={`team ${getWinnerClass(item, 'HOME_TEAM')}`}>{item.homeTeam.name}</span>
                  <span className='scores'>
                    <span>{item.score.fullTime.homeTeam} </span>-<span> {item.score.fullTime.awayTeam}</span>
                  </span>
                  <span className={`team team-right ${getWinnerClass(item, 'AWAY_TEAM')}`}> {item.awayTeam.name}</span>
                </li>
              )}
            </ul>
          </li>
        )}
      </>
    )
  };


  return (
    <div className='todaysMatches'>
      <div className="todaysMatches__tabs">
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <Tab label='Live'/>
          <Tab label='Scheduled' />
          <Tab label='Finished' />
        </Tabs>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            // inputVariant="outlined"
            minDate={new Date().setDate(new Date().getDate() - 7)}
            maxDate={new Date().setDate(new Date().getDate() + 7)}
            margin="normal"
            value={currentDate}
            onChange={(date => getMatchesByDate(getFullDate(date)))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      {matches.loading === Object.keys(matches).length - 1
        ? <>
            <TabPanel value={value} index={0}>
              <ul>
                {getMatches(matches.LIVE, 'live')}
              </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ul>
                {getMatches(matches.SCHEDULED, 'scheduled')}
              </ul>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ul>
                {getMatches(matches.FINISHED, 'finished')}
              </ul>
            </TabPanel>
          </>
        : <Loader/>
      }

      <MatchDetailModal
        open={isMatchDetailModalOpen}
        close={setIsMatchDetailModalOpen}
        currentMatch={currentMatch}
      />
    </div>
  )
};

export default TodaysMatches;