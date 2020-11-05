import React, {useEffect, useState} from 'react';
import {getTodaysMatchesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './TodaysMatches.scss'
import unknownFlag from '../../assets/images/unknown_flag.svg.png'
import {Link} from "react-router-dom";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const getMatches = (item) => {
  return(
    <>
      {item && Object.values(item).map(el =>
        <li>
          <p>
            <span className='icon'
              style={{backgroundImage: `url(${el[0].competition.area.ensignUrl ? el[0].competition.area.ensignUrl : unknownFlag})`}}/>
            <b>{el[0].competition.area.name}: </b>
            <Link to={`/league/${el[0].competition.id}`}>{el[0].competition.name}</Link>
          </p>
          <ul>
            {el.map(item =>
              <li key={item.id}>
                <span>{item.homeTeam.name}</span>:
                <span>{item.awayTeam.name}</span>
              </li>
            )}
          </ul>
        </li>
      )}
    </>
  )
};

const TodaysMatches = () => {

  const dispatch = useDispatch();
  const matches = useSelector(state => state.leagues.matches);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getTodaysMatchesRequest('LIVE'));
    dispatch(getTodaysMatchesRequest('SCHEDULED'));
    dispatch(getTodaysMatchesRequest('FINISHED'));
  }, []); // eslint-disable-line

  return (
    <div className='todaysMatches'>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="fullWidth"
      >
        <Tab label='Live'/>
        <Tab label='Scheduled' />
        <Tab label='Finished' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ul>
          {getMatches(matches.LIVE)}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul>
          {getMatches(matches.SCHEDULED)}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ul>
          {getMatches(matches.FINISHED)}
        </ul>
      </TabPanel>
    </div>
  )
};

export default TodaysMatches;