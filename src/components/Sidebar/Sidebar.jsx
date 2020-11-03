import React, {useEffect} from 'react';
import {getCountriesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import './Sidebar.scss'

const Sidebar = () => {

  const popularLeagues = useSelector(state => state.leagues.popularLeagues);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesRequest());
  }, []); // eslint-disable-line

  return (
    <ul className='sidebar'>
      {popularLeagues.map(item =>
        <li>
          <span style={{backgroundImage: `url(${item.area.ensignUrl})`}}/>
          {item.area.name}
        </li>
      )}
    </ul>
  )
};

export default Sidebar;