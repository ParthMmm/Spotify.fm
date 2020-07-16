import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row } from "react-bootstrap";
import SpotifyContainer from "./SpotifyContainer";

require("dotenv").config();
const App = () => {
  return (
    <div className="body">
      <Container className="md-container">
        <Helmet
          title="Spotify.FM Playlists"
          meta={[{ property: "og:title", content: "Home" }]}
        >
          <style>{"body { background-color: #2f3542; }"}</style>
        </Helmet>

        <Container className="header">
          <h1>Welcome to Spotify.FM Playlists!</h1>
          <p>A Spotify account and Last.FM account are required.</p>
        </Container>

        <Container className="smaller-container">
          <Row className="justify-content-center">
            <SpotifyContainer />
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default App;
