import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './Layout.scss'

const Layout = (props) => {
  return (
    <main className='main'>
      <Sidebar/>
      {props.children}
    </main>
  )
};

export default Layout;