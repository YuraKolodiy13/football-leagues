import React, {useState} from 'react';
import {searchUsers} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import './Test.scss'

const Test = () => {

  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const repos = useSelector(state => state.leagues.repos);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUsers(state))
  };

  return (
    <div className='test'>
      <div className="test__wrap">
        <h1>Github Explorer</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text" value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='Github user'
          />
          <button type='submit'>Explore</button>
        </form>
      </div>

      <ul>
        {repos && repos.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
    </div>
  )
};

export default Test;