import React, {Fragment, useEffect} from 'react';
import {getCountriesRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import './Sidebar.scss'
import {Link} from "react-router-dom";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

const Sidebar = () => {

  const popularLeagues = useSelector(state => state.leagues.popularLeagues);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesRequest());
  }, []); // eslint-disable-line

  const treeTableWrapper = (taskTree) => {
    return taskTree && taskTree.map((item, index) => {
      return (
        <Fragment key={index}>
          <TreeItem
            nodeId={index.toString()}
            label={item.length < 2 ? <Link to={`/league/${item[0].id}`}>{item[0].area.name}</Link> : item[0].area.name}
            style={{backgroundImage: `url(${item[0].area.ensignUrl})`}}
          >
            {item.length > 1 && treeTable(item)}
          </TreeItem>
        </Fragment>
      )
    });
  };

  const treeTable = (taskTree) => {
    return taskTree && taskTree.map(league => {
      return (
        <li key={league.id}>{row(league)}</li>
      )
    });
  };


  const row = (league) => {
    return (
      <Link to={`/league/${league.id}`}>{league.name}</Link>
    )
  };


  return (
    <TreeView
      className='sidebar'
      defaultCollapseIcon={<span className='arrow'/>}
      defaultExpandIcon={<span className='arrow'/>}
      multiSelect
    >{treeTableWrapper(popularLeagues)}</TreeView>
  )
};

export default Sidebar;