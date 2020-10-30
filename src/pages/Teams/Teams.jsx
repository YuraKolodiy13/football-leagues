import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTeamsRequest} from "../../actions/leagues";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './Teams.scss'
import {Link} from "react-router-dom";

const Teams = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.leagues.teams);

  useEffect(() => {
    dispatch(getTeamsRequest());
  }, [dispatch]);

  return (
    <div className='teams'>
      {teams && teams.map(item => (
        <div className='teams__item' key={item.id}>
          <Card>
            <CardActionArea>
              <CardMedia
                image={item.crestUrl}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.shortName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.venue}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Link to={`/team/${item.id}`}/>
        </div>
      ))}
    </div>
  )
};

export default Teams;