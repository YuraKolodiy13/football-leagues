import React, {useEffect, useState} from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './MatchDetailModal.scss'
import unknownTeam from '../../assets/images/soccer.png'
import unknownFlag from "../../assets/images/unknown_flag.png";
import incidentSprite from "../../assets/images/incident-sprite.svg";
import livetableSprite from "../../assets/images/livetable-sprite.svg";
import homeTeamShirt from "../../assets/images/dress-white.gif";
import awayTeamShirt from "../../assets/images/dress-blue.gif";
import field from "../../assets/images/field.gif";
import {Link} from "react-router-dom";
import TabPanel from "../../components/TabPanel/TabPanel";
import {getHead2HeadRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
const results = ['wins', 'draws', 'losses'];

const MatchDetailModal = ({open, close, currentMatch}) => {

  const dispatch = useDispatch();
  const head2head = useSelector(state => state.leagues.head2head);
  const [value, setValue] = useState(0);

  const closeModal = () => {
    close(false);
  };

  useEffect(() => {
    if(Object.keys(currentMatch).length){
      dispatch(getHead2HeadRequest(currentMatch.id))
    }
  }, [currentMatch, dispatch]);

  const summaryItem = (item) => {
    return(
      <>
        <span>{item.minute}'</span>
        {item.card && (
          <span
            className={`icon ${item.card.toLowerCase()}`}
            style={{backgroundImage: `url(${incidentSprite})`}}
          />
        )}
        {item.player && (
          <span>{item.player.name}</span>
        )}
        {item.playerIn && (
          <>
            <span className='icon substitution-in' style={{backgroundImage: `url(${livetableSprite})`}}/>
            <span>{item.playerIn.name}</span>
            <span className='icon substitution-out' style={{backgroundImage: `url(${livetableSprite})`}}/>
            <span>{item.playerOut.name}</span>
          </>
        )}
        {item.scorer && (
          <>
            <span className={`icon ${item.type === 'OWN' ? 'own' : 'scorer'}`} style={{backgroundImage: `url(${incidentSprite})`}}/>
            <span>{item.scorer.name}</span>
            {item.type === 'PENALTY' && <span className='assist'>(Penalty)</span>}
            {item.type === 'OWN' && <span className='own-goal'>(Own goal)</span>}
            {item.assist && <span className='assist'>({item.assist.name})</span>}
          </>
        )}
      </>
    )
  };

  const getLineup = (item) => {
    return(
      <>
        {item && item.map(item =>
          <li key={item.id}><span>{item.shirtNumber} </span>{item.name}</li>
        )}
      </>
    )
  };

  const getLineupOnField = (value, isHome) => {
    return(
      <>
        {positions.map((item, index) =>
          <ul className={`lineups__${item.toLowerCase()}`} key={index}>
            {value && value.map(el => el.position === item &&
              <li key={el.shirtNumber}>
                <span className='number'
                  style={{backgroundImage: `url(${isHome ? homeTeamShirt : awayTeamShirt})`}}
                >
                  {el.shirtNumber}
                </span>
                <span className='name'>
                  <Link to={`/player/${el.name}`}>{el.name}</Link>
                </span>
              </li>
            )}
          </ul>
        )}
      </>
    )
  };

  return (
    <Modal
      className='modal'
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <>
          {Object.keys(currentMatch).length && (
            <div className='modal__content matchDetail'>
              <div className="matchDetail__top-info">
                <div className="matchDetail-general">
                  {currentMatch.competition.area && (
                    <>
                      <span className='icon'
                        style={{backgroundImage: `url(${currentMatch.competition.area.ensignUrl ? currentMatch.competition.area.ensignUrl : unknownFlag})`}}
                      />
                      <b className='mr-5'>{currentMatch.competition.area.name}: </b>
                    </>
                  )}
                  <Link to={`/league/${currentMatch.competition.id}`}>{currentMatch.competition.name}</Link>
                  <span className='ml-a'>{new Date(currentMatch.utcDate + '').toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour12 : false,
                    hour:  "2-digit",
                    minute: "2-digit",
                  })}</span>
                </div>
                <div className="matchDetail__team">
                  <Link to={`/team/${currentMatch.homeTeam.id}`}>
                    <img onError={e => e.target.src = unknownTeam} src={`https://crests.football-data.org/${currentMatch.homeTeam.id}.svg`} alt=""/>
                  </Link>
                  <Link to={`/team/${currentMatch.homeTeam.id}`}>{currentMatch.homeTeam.name}</Link>
                </div>
                <div className={`matchDetail__scores ${currentMatch.status.toLowerCase()}`}>
                  <p>{currentMatch.score.fullTime.homeTeam} - {currentMatch.score.fullTime.awayTeam}</p>
                  <span>{currentMatch.status}</span>
                </div>
                <div className="matchDetail__team">
                  <Link to={`/team/${currentMatch.awayTeam.id}`}>
                    <img onError={e => e.target.src = unknownTeam} src={`https://crests.football-data.org/${currentMatch.awayTeam.id}.svg`} alt=""/>
                  </Link>
                  <Link to={`/team/${currentMatch.awayTeam.id}`}>{currentMatch.awayTeam.name}</Link>
                </div>
              </div>

              <Tabs
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                variant="fullWidth"
              >
                <Tab label='Match Summary'/>
                <Tab label='Lineups' />
                <Tab label='H2H' />
              </Tabs>
              <TabPanel value={value} index={0}>
                {currentMatch.summary
                  ?<ul className='summary'>
                    {currentMatch.summary.map((item, index) =>
                      <li key={index}>
                        {item.team.name === currentMatch.homeTeam.name
                          ? <p className={`${item.type === 'OWN' ? 'right' : ''}`}>{summaryItem(item)}</p>
                          : <p className={`right ${item.type === 'OWN' ? 'left' : ''}`}>{summaryItem(item)}</p>
                        }
                      </li>
                    )}
                  </ul>
                  : <p className='notStarted'>No live score information available now, the match has not started yet.</p>
                }
              </TabPanel>
              <TabPanel value={value} index={1}>
                {currentMatch.homeTeam.lineup && currentMatch.homeTeam.lineup.length > 0
                  ?<div className="lineups">
                    <div className="lineups__field field" style={{backgroundImage: `url(${field})`}}>
                      <div className="field__home">
                        {getLineupOnField(currentMatch.homeTeam.lineup, 'home')}
                      </div>
                      <div className="field__away">
                        {getLineupOnField(currentMatch.awayTeam.lineup)}
                      </div>
                    </div>
                    <div className="lineups__wrap">
                      <h5>Starting Lineups</h5>
                      <div className="lineups__main">
                        <ul>
                          {getLineup(currentMatch.homeTeam.lineup)}
                        </ul>
                        <ul className='right'>
                          {getLineup(currentMatch.awayTeam.lineup)}
                        </ul>
                      </div>
                      <h5>Substitutes</h5>
                      <div className="lineups__bench">
                        <ul>
                          {getLineup(currentMatch.homeTeam.bench)}
                        </ul>
                        <ul className='right'>
                          {getLineup(currentMatch.awayTeam.bench)}
                        </ul>
                      </div>
                      <h5>Coaches</h5>
                      <div className="lineups__bench">
                        <ul>
                          <li>{currentMatch.homeTeam.coach && currentMatch.homeTeam.coach.name}</li>
                        </ul>
                        <ul>
                          <li>{currentMatch.awayTeam.coach && currentMatch.awayTeam.coach.name}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  : <p className='notStarted'>No live score information available now, the match has not started yet.</p>
                }
              </TabPanel>
              <TabPanel value={value} index={2}>
                {!!Object.keys(head2head).length && (
                  <div className="h2h">
                    {results.map((item, index) =>
                      <div key={index} className='h2h__item'>
                        <p>{item}</p>
                        <div className="h2h__line">
                          <div className="h2h__left">
                            <div className="h2h__count">{head2head.homeTeam[item]}</div>
                            <div className="h2h__bar-bg">
                              <div className="h2h__bar-Line"
                                style={{
                                  width: head2head.homeTeam[item] * 100 / (head2head.homeTeam[item] + head2head.awayTeam[item]) + '%',
                                  backgroundColor: head2head.homeTeam[item] * 100 / (head2head.homeTeam[item] + head2head.awayTeam[item]) > 50 ? '#c00' : '#2d2d2d'
                                }}
                              />
                            </div>
                          </div>
                          <div className="h2h__right">
                            <div className="h2h__count">{head2head.awayTeam[item]}</div>
                            <div className="h2h__bar-bg">
                              <div className="h2h__bar-Line"
                                   style={{
                                     width: head2head.awayTeam[item] * 100 / (head2head.awayTeam[item] + head2head.homeTeam[item]) + '%',
                                     backgroundColor: head2head.awayTeam[item] * 100 / (head2head.awayTeam[item] + head2head.homeTeam[item]) > 50 ? '#c00' : '#2d2d2d'
                                   }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {head2head.gfd}
                  </div>
                )}
              </TabPanel>
            </div>
          )}
        </>
      </Fade>
    </Modal>
  )
};

export default MatchDetailModal;