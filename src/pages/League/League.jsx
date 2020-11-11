import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getScorersRequest, getTableRequest} from "../../actions/leagues";
import './League.scss'
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Standings from "./Standings";
import Schedule from "./Schedule";
import TabPanel from "../../components/TabPanel/TabPanel";

const League = (props) => {
  const dispatch = useDispatch();
  const table = useSelector(state => state.leagues.table);
  const scorers = useSelector(state => state.leagues.scorers);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getTableRequest(props.match.params.id));
    dispatch(getScorersRequest(props.match.params.id));
  }, [props.match.params.id]); // eslint-disable-line

  return (
    <div className='home'>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <Tab label='Standings'/>
        <Tab label='Schedule' />
        <Tab label='Top scorers' />
        <Tab label='Results' />
      </Tabs>
      {!!table.length
        ? <>
          <TabPanel value={value} index={0}>
            <Standings table={table}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Schedule/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {!!scorers.length
              ?<ul>
                {scorers.map(item =>
                  <li key={item.player.id}>{item.player.name} {item.numberOfGoals}</li>
                )}
              </ul>
              : <p>no info about scorers</p>
            }
          </TabPanel>
        </>
        : <p>no info about this league</p>
      }

    </div>
  )
};

export default League;