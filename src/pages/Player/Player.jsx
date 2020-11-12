import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlayerRequest} from "../../actions/leagues";
import './Player.scss'
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";

const Player = (props) => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.leagues.player);

  const loading = useSelector(state => state.leagues.loading);


  useEffect(() => {
    dispatch(getPlayerRequest(props.match.params.id));
  }, []); // eslint-disable-line

  return (
    <div className='player'>
      <ul className='breadcrumbs'>
        <li><Link to='/'>Home</Link></li>
        {player.strPlayer && (
          <>
            <li>{player.strTeam}</li>
            <li>{player.strPlayer}</li>
          </>
        )}
      </ul>

      {loading
        ? <Loader/>
        : <>
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
          </>
      }
    </div>
  )
};

export default Player;