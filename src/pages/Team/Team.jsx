import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTeamRequest} from "../../actions/leagues";
import './Team.scss'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link, useHistory} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Loader from "../../components/Loader/Loader";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "../../components/TabPanel/TabPanel";
import Matches from "../../components/Matches/Matches";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {Bar} from "react-chartjs-2";

const Team = (props) => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.leagues.team);
  const teamInfo = useSelector(state => state.leagues.teamInfo);
  const loading = useSelector(state => state.leagues.loading);
  const teamNextEvents = useSelector(state => state.leagues.teamNextEvents);
  const teamPrevEvents = useSelector(state => state.leagues.teamPrevEvents);
  const teamRssNews = useSelector(state => state.leagues.teamRssNews);
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [visibleNews, setVisibleNews] = useState(9);
  const [visibleMatches, setVisibleMatches] = useState(10);

  useEffect(() => {
    dispatch(getTeamRequest(props.match.params.id));
  }, []); // eslint-disable-line

  const data = {
    labels: team.squad && [...team.squad.reduce((prev, item) => {
      if(item.role !== 'COACH') return [...prev, item.name];
      return prev;
    }, [])],
    datasets: [
      {
        label: 'Age',
        backgroundColor: 'rgba(8, 95, 0, .8)',
        data: team.squad && [...team.squad.slice(0, -1).reduce((prev, item) => {
          if(item.role !== 'COACH') return [...prev, new Date().getFullYear() - new Date(item.dateOfBirth).getFullYear()];
          return prev;
        }, [])]
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          min:16
        }
      }]
    }
  };

  return (
    <div className='team'>
      <ul className='breadcrumbs'>
        <li><Link to='/'>home</Link></li>
        {team.activeCompetitions && !!team.activeCompetitions.length && (
          <li><Link to={`/league/${team.activeCompetitions[0].id}`}>{team.activeCompetitions[0].name}</Link></li>
        )}
        <li>{team.name}</li>
      </ul>

      {loading
        ? <Loader/>
        : <>
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          >
            <Tab label='About'/>
            <Tab label='Squad' />
            <Tab label='Schedule' />
            <Tab label='Prev matches' />
            <Tab label='News' />
          </Tabs>

          <TabPanel value={value} index={0}>
            {teamInfo.strTeam && (
              <>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strTeamBanner})`}}/>
                <h1>{teamInfo.strTeam}</h1>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strStadiumThumb})`}}/>
                <p>{teamInfo.strStadiumDescription}</p>
                <div className="banner" style={{backgroundImage: `url(${teamInfo.strTeamFanart4})`}}/>
                <p>{teamInfo.strDescriptionEN}</p>
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>dateOfBirth</TableCell>
                    <TableCell>nationality</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.squad && team.squad.map((row, index) => (
                    <TableRow key={row.id} onClick={() => history.push(`/player/${row.id}`)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>
                        {new Date(row.dateOfBirth + '').toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</TableCell>
                      <TableCell>{row.nationality}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Bar data={data} options={options}/>
            <span className='test'/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Matches matches={teamNextEvents} visibleMatches={visibleMatches}/>
            {visibleMatches < teamNextEvents.length &&
              <span className='showMore' onClick={() => setVisibleMatches(visibleMatches + 10)}>Show more matches</span>
            }
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Matches matches={teamPrevEvents.slice().reverse()}/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            {!!Object.keys(teamRssNews).length
              ? <div className='news'>
                <h2>{teamRssNews.title}</h2>
                <ul>
                  {teamRssNews.items.slice(0, visibleNews).map((item, index) =>
                    <li key={index}>
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            image={teamInfo.strTeamBanner}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <h4>{item.title}</h4>
                            <p>{item.contentSnippet}</p>
                            <span>
                              {new Date(item.isoDate + '').toLocaleDateString('uk', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour12 : false,
                                hour:  "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <a href={item.link} rel="noreferrer"  target='_blank'>open news</a>
                    </li>
                  )}
                </ul>
                {visibleNews < teamRssNews.items.length &&
                  <span className='showMore' onClick={() => setVisibleNews(visibleNews + 9)}>Show more matches</span>
                }
              </div>
              : <p>no news</p>
            }
          </TabPanel>
          </>

      }


    </div>
  )
};

export default Team;