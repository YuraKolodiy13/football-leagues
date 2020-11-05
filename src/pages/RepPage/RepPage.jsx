import React, {useState} from 'react';
import {searchUsers} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import './RepPage.scss'

const RepPage = () => {

  const repos = useSelector(state => state.leagues.repos);


  return (
    <div className='test'>
      <ul>
        {repos && repos.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
    </div>
  )
};

export default RepPage;