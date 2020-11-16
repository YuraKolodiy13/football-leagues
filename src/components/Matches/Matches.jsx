import React, {useState} from 'react';
import MatchDetailModal from "../MatchDetailModal/MatchDetailModal";

const Matches = ({matches}) => {
  const [isMatchDetailModalOpen, setIsMatchDetailModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState({});

  const viewMatch = (match) => {
    setCurrentMatch(match);
    setIsMatchDetailModalOpen(true);
  };

  return (
    <div className='matches'>
      <ul>
        {matches.map((row) => (
          <li key={row.id} className='match' onClick={() => viewMatch(row)}>
              <span className='matchTime'>
                {new Date(row.utcDate + '').toLocaleDateString('uk', {
                  month: 'numeric',
                  day: 'numeric',
                  hour12 : false,
                  hour:  "2-digit",
                  minute: "2-digit",
                })}
              </span>
            {/*<span>{row.status}</span>*/}
            <span className='team'>{row.homeTeam.name}</span>
            <span className='scores'>
              <span>{row.score.fullTime.homeTeam} </span>-<span> {row.score.fullTime.awayTeam}</span>
            </span>
            <span className='team team-right'>{row.awayTeam.name}</span>
          </li>
        ))}
      </ul>

      <MatchDetailModal
        open={isMatchDetailModalOpen}
        close={setIsMatchDetailModalOpen}
        currentMatch={currentMatch}
      />
    </div>
  )
};

export default Matches;