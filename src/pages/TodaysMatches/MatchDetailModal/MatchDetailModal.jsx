import React, {useState} from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './MatchDetailModal.scss'
import unknownTeam from '../../../assets/images/soccer.png'
import unknownFlag from "../../../assets/images/unknown_flag.png";
import incidentSprite from "../../../assets/images/incident-sprite.svg";
import livetableSprite from "../../../assets/images/livetable-sprite.svg";
import homeTeamShirt from "../../../assets/images/dress-white.gif";
import awayTeamShirt from "../../../assets/images/dress-blue.gif";
import field from "../../../assets/images/field.gif";
import {Link} from "react-router-dom";
import TabPanel from "../../../components/TabPanel/TabPanel";
const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];

const MatchDetailModal = ({open, close, currentMatch}) => {

  const [value, setValue] = useState(0);

  const closeModal = () => {
    close(false);
  };

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
                  <span className='icon'
                    style={{backgroundImage: `url(${currentMatch.competition.area.ensignUrl ? currentMatch.competition.area.ensignUrl : unknownFlag})`}}
                  />
                  <b className='mr-5'>{currentMatch.competition.area.name}: </b>
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

              {currentMatch.summary.length
                ? <>
                  <Tabs
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    variant="fullWidth"
                  >
                    <Tab label='Match Summary'/>
                    <Tab label='Lineups' />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <ul className='summary'>
                      {currentMatch.summary && currentMatch.summary.map((item, index) =>
                        <li key={index}>
                          {item.team.name === currentMatch.homeTeam.name
                            ? <p className={`${item.type === 'OWN' ? 'right' : ''}`}>{summaryItem(item)}</p>
                            : <p className={`right ${item.type === 'OWN' ? 'left' : ''}`}>{summaryItem(item)}</p>
                          }
                        </li>
                      )}
                    </ul>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="lineups">
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
                  </TabPanel>
                </>
                : <p className='notStarted'>No live score information available now, the match has not started yet.</p>
              }
            </div>
          )}
        </>
      </Fade>
    </Modal>
  )
};

export default MatchDetailModal;