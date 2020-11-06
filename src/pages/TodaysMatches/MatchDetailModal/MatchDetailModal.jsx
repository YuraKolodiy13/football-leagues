import React, {useState} from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './MatchDetailModal.scss'
import unknownTeam from '../../../assets/images/soccer.png'
import unknownFlag from "../../../assets/images/unknown_flag.svg.png";
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

const MatchDetailModal = ({open, close, currentMatch}) => {

  const [value, setValue] = useState(0);

  const closeModal = () => {
    close(false);
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
                <img onError={e => e.target.src = unknownTeam} src={`https://crests.football-data.org/${currentMatch.homeTeam.id}.svg`} alt=""/>
                <p>{currentMatch.homeTeam.name}</p>
              </div>
              <div className={`matchDetail__scores ${currentMatch.status.toLowerCase()}`}>
                <p>{currentMatch.score.fullTime.homeTeam} - {currentMatch.score.fullTime.awayTeam}</p>
                <span>{currentMatch.status}</span>
              </div>
              <div className="matchDetail__team">
                <img onError={e => e.target.src = unknownTeam} src={`https://crests.football-data.org/${currentMatch.awayTeam.id}.svg`} alt=""/>
                <p>{currentMatch.awayTeam.name}</p>
              </div>
            </div>

            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              variant="fullWidth"
            >
              <Tab label='Match Summary'/>
              <Tab label='Lineups' />
            </Tabs>
            <TabPanel value={value} index={0}>

            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
          </div>
        )}

      </Fade>
    </Modal>
  )
};

export default MatchDetailModal;