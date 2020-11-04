import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './Layout.scss'

const Layout = (props) => {
  return (
    <div className='layout'>
      <Sidebar/>
      <main className="main">
        {props.children}
      </main>
    </div>
  )
};

export default Layout;