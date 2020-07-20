import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { submitForm } from "../actions";
import { gql, useQuery } from "@apollo/client";
import * as SpotifyFunctions from "../api/spotifyFunctions";
import * as SpotifyWebApi from "spotify-web-api-js";

let spotify = new SpotifyWebApi();

const TOP_TRACKS = gql`
  query topTracks {
    topTracks(username: "parth_m", period: "1month") {
      name
      artist {
        name
      }
    }
  }
`;
function LastFmData({ username, period }) {
  const { loading, error, data } = useQuery(TOP_TRACKS, {
    variables: { username, period },
  });
  console.log(data);
  console.log(typeof data);
  // let tracks = data.topTracks;
  // console.log(data[Object.keys(data)[0]].name);
  // Object.entries(data.topTracks).map(([name, artist]) => {
  //   console.log(name);
  //   console.log(artist.name);
  // });
  // const output = data.topTracks.map((song) => song.name);
  // console.log(output);
  // Object.keys(data.topTracks).forEach((id) => {
  //   let song = data[id];
  //   console.log(song.name);
  // });
  // const songs = data.map(
  //   (song) => song.topTracks.name + song.topTracks.artist.name
  // );
  // {data.topTracks.map((song, index) => (

  //     {song.name}

  // ))}
  // let songs = data.topTracks.map((song, index) => song.name + song.artist.name);
  // console.log(songs);
  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  if (!loading && !error) {
    let songs = data.topTracks.map((song, index) =>
      (song.name + " " + song.artist.name).replace(/\s/g, "%20")
    );
    spotify.setAccessToken(SpotifyFunctions.checkUrlForSpotifyAccessToken());
    spotify.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", function (err, data) {
      if (err) console.error(err);
      else console.log("Artist albums", data);
    });
    // console.log(SpotifyFunctions.checkUrlForSpotifyAccessToken());

    // songs.forEach((s) => s.replace(/\s/g, "%20"));
    console.log(songs);
  }
  return (
    <p>
      {data.topTracks.map((song, index) => (
        <option key={index} value={song.name}>
          {song.name + song.artist.name}
        </option>
      ))}
    </p>
  );
  // return <h1>serenity now</h1>;
}
const mapStateToProps = (state) => {
  console.log(state);
  return { username: state.data.username, period: state.data.period };
};

export default connect(mapStateToProps, { submitForm })(LastFmData);
