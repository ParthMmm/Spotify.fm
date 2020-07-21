import React, { Component } from "react";

import * as SpotifyFunctions from "../api/spotifyFunctions";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class ConnectSpotify extends Component {
  done() {
    return <Redirect to="/form" />;
  }
  render() {
    return (
      <div className="ConnectSpotify">
        <a
          href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}
          onClick={this.done}
        >
          <Button variant="success" className="btn-green">
            <img
              className="btn-img"
              alt="spotify"
              src="https://img.icons8.com/material-rounded/24/000000/spotify.png"
            />{" "}
            Spotify Login
          </Button>
        </a>
      </div>
    );
  }
}

export default ConnectSpotify;
