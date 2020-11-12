import React from 'react';
import Teams from "./pages/Teams/Teams";
import {Route, Switch} from "react-router-dom";
import Team from "./pages/Team/Team";
import League from "./pages/League/League";
import Header from "./components/Header/Header";
import Player from "./pages/Player/Player";
import Layout from "./layout/Layout";
import TodaysMatches from "./pages/TodaysMatches/TodaysMatches";
import Test from "./pages/Test/Test";
import RepPage from "./pages/RepPage/RepPage";
import World from "./pages/World/World";

const App = () => {
  return (
    <div className="App container">
      <Header/>
      <Layout>
        <Switch>
          <Route path="/" component={TodaysMatches} exact />
          <Route path="/league/:id" component={League} />
          <Route path="/teams" component={Teams} />
          <Route path="/team/:id" component={Team} />
          <Route path="/player/:id" component={Player} />
          <Route path="/test" component={Test} />
          <Route path="/repos" component={RepPage} />
          <Route path="/world" component={World} />
        </Switch>
      </Layout>

    </div>
  );
}

export default App;
