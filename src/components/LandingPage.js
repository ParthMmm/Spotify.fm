import React from "react";
import { Container, Row } from "react-bootstrap";
import { Animated } from "react-animated-css";
import ConnectSpotify from "./ConnectSpotify";

export default function LandingPage() {
  return (
    <div className="body">
      <Animated animationIn="fadeIn" isVisible={true} animationInDelay={250}>
        <Container className="md-container">
          <Container className="header">
            <h1 className="header">Spotify.fm Playlists</h1>
          </Container>

          <Container className="sub-header">
            <h5 className="sub-header">
              Create Spotify playlists with your Last.fm top tracks data.
            </h5>
          </Container>

          <Container className="smaller-container">
            <Row className="justify-content-center">
              <ConnectSpotify />
            </Row>
          </Container>
          <Container className="sub-sub-header">
            <p>A Spotify and Last.fm account are both required.</p>
          </Container>
        </Container>
      </Animated>
    </div>
  );
}
