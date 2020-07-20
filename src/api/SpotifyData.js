import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { submitForm } from "../actions";
import { gql, useQuery } from "@apollo/client";
import * as SpotifyFunctions from "../api/spotifyFunctions";
import * as SpotifyWebApi from "spotify-web-api-js";

export default function SpotifyData({ playlistName }) {
  let spotify = new SpotifyWebApi();

  return (
    <div>
      <p>poggie woggie</p>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    playlistName: state.data.playlistName,
  };
};

export default connect(mapStateToProps, { submitForm })(SpotifyData);
