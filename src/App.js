import React from 'react';
import Teams from "./pages/Teams/Teams";
import {Route, Switch} from "react-router-dom";
import Team from "./pages/Team/Team";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Player from "./pages/Player/Player";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div className="App container">
      <Header/>
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/teams" component={Teams} />
          <Route path="/team/:id" component={Team} />
          <Route path="/player/:id" component={Player} />
        </Switch>
      </Layout>

    </div>
  );
}

export default App;
