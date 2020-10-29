import React from 'react';
import './Header.scss'
import {NavLink} from  'react-router-dom'

const Header = () =>{
  return (
    <nav className='header__wrapper'>
      <div className='header container'>
        <h1>
          <NavLink to='/' exact>Home</NavLink>
        </h1>
        <ul>
          <li>
            <NavLink to="/teams">Teams</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  )
};


export default Header;