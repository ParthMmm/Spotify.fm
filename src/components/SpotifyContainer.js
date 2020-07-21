import React, { Component } from "react";
import * as SpotifyFunctions from "../api/spotifyFunctions.js";
import { Redirect } from "react-router-dom";
class SpotifyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInToSpotify: false,
      accessToken: null,
    };
  }

  componentDidMount() {
    //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
    //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
    const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
    accessToken
      ? this.setState({ loggedInToSpotify: true, accessToken: accessToken })
      : this.setState({ loggedInToSpotify: false, accessToken: null });
  }

  render() {
    return (
      <div className="md-container">
        <div className="SpotifyContainer">
          {!this.state.loggedInToSpotify ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/form" />
          )}
        </div>
      </div>
    );
  }
}
export default SpotifyContainer;
