import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlayerRequest} from "../../actions/leagues";
import './Player.scss'
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";
import Matches from "../../components/Matches/Matches";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "../../components/TabPanel/TabPanel";

const Player = (props) => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.leagues.player);
  const playerMatches = useSelector(state => state.leagues.playerMatches);
  const playerInfo = useSelector(state => state.leagues.playerInfo);
  const loading = useSelector(state => state.leagues.loading);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getPlayerRequest(props.match.params.id));
  }, []); // eslint-disable-line

  return (
    <div className='player'>
      <ul className='breadcrumbs'>
        <li><Link to='/'>Home</Link></li>
        {playerInfo.strPlayer && (
          <>
            <li>{playerInfo.strTeam}</li>
            <li>{playerInfo.strPlayer}</li>
          </>
        )}
      </ul>

      {loading
        ? <Loader/>
        : <>
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
            >
              <Tab label='About'/>
              <Tab label='Matches' />
            </Tabs>
            <TabPanel value={value} index={0}>
              {playerInfo.strPlayer
                ? <div className='player__wrapper'>
                  <div className="player__photo">
                    <img src={playerInfo.strRender
                      ? playerInfo.strRender
                      : playerInfo.strCutout
                        ? playerInfo.strCutout
                        : playerInfo.strThumb
                    }
                         alt=""/>
                  </div>
                  <div className="player__info">
                    <h1>{playerInfo.strPlayer}</h1>
                    <p>{playerInfo.strDescriptionEN}</p>
                  </div>
                </div>
                : 'no info about player'
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Matches matches={playerMatches} />
            </TabPanel>
          </>
      }
    </div>
  )
};

export default Player;