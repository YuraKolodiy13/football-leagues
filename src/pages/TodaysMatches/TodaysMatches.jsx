import React, {useEffect, useState} from 'react';
import {getTodaysMatchesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    <div>
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
          {matches.LIVE && Object.values(matches.LIVE).map(el =>
            el.map(item =>
              <li key={item.id}>
                <span>{item.homeTeam.name}</span>:
                <span>{item.awayTeam.name}</span>
              </li>
            )
          )}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul>
          {matches.SCHEDULED && Object.values(matches.SCHEDULED).map(el =>
            el.map(item =>
              <li key={item.id}>
                <span>{item.homeTeam.name}</span>:
                <span>{item.awayTeam.name}</span>
              </li>
            )
          )}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ul>
          {matches.FINISHED && Object.values(matches.FINISHED).map(el =>
            el.map(item =>
              <li key={item.id}>
                <span>{item.homeTeam.name}</span>:
                <span>{item.awayTeam.name}</span>
              </li>
            )
          )}
        </ul>
      </TabPanel>
    </div>
  )
};

export default TodaysMatches;