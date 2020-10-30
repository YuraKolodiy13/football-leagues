import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlayerRequest} from "../../actions/leagues";
import './Player.scss'
import Loader from "../../components/Loader/Loader";

const Player = (props) => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.leagues.player);

  const loading = useSelector(state => state.leagues.loading);


  useEffect(() => {
    dispatch(getPlayerRequest(props.match.params.id));
  }, []); // eslint-disable-line

  if(loading) return <Loader/>;

  return (
    <div className='player'>
      {player.strPlayer
        ? <div className='player__wrapper'>
            <div className="player__photo">
              <img src={player.strRender
                ? player.strRender
                : player.strCutout
                  ? player.strCutout
                  : player.strThumb
              }
               alt=""/>
            </div>
            <div className="player__info">
              <h1>{player.strPlayer}</h1>
              <p>{player.strDescriptionEN}</p>
            </div>
          </div>
        : 'no info about player'
      }
    </div>
  )
};

export default Player;