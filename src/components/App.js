import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import SpotifyContainer from "./SpotifyContainer";
import { Animated } from "react-animated-css";
import LandingPage from "./LandingPage";
import ConnectSpotify from "./ConnectSpotify";
import FormToSubmit from "./FormToSubmit";
import Header from "./Header";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={SpotifyContainer}></Route>
          <Route path="/home" exact component={LandingPage}></Route>
          <Route path="/form" exact component={FormToSubmit}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
