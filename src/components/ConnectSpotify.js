import React, { Component } from "react";

import * as SpotifyFunctions from "../api/spotifyFunctions";
import { Button } from "react-bootstrap";

class ConnectSpotify extends Component {
  render() {
    return (
      <div className="ConnectSpotify">
        <a href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
          <Button variant="success">
            <img
              alt="spotify"
              src="https://img.icons8.com/material-rounded/24/000000/spotify.png"
            />
            Spotify Login
          </Button>{" "}
        </a>
      </div>
    );
  }
}

export default ConnectSpotify;
