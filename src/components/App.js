import React from "react";
import { Container, Row } from "react-bootstrap";
import SpotifyContainer from "./SpotifyContainer";
import { Animated } from "react-animated-css";

require("dotenv").config();
const App = () => {
  return (
    <div className="body">
      <Animated animationIn="fadeIn" isVisible={true}>
        <Container className="md-container">
          <Container className="header">
            <h1>Spotify.FM Playlists</h1>
          </Container>

          <Container className="sub-header">
            <h6>
              Create Spotify playlists with your Last.FM top tracks data. A
              Spotify and Last.FM account are both required.
            </h6>
          </Container>

          <Container className="smaller-container">
            <Row className="justify-content-center">
              <SpotifyContainer />
            </Row>
          </Container>
        </Container>
      </Animated>
    </div>
  );
};

export default App;
