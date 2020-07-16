import React, { Component } from "react";
import ConnectSpotify from "./ConnectSpotify";
import * as SpotifyFunctions from "../api/spotifyFunctions.js";
import FormToSubmit from "./FormToSubmit";
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
    // this.setState({ formSubmitted: this.props.formSubmitted() });
  }

  render() {
    return (
      <div className="SpotifyContainer">
        {!this.state.loggedInToSpotify ? <ConnectSpotify /> : <FormToSubmit />}
      </div>
    );
  }
}
export default SpotifyContainer;
