import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { submitForm, userID } from "../actions";
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
function LastFmData({ username, period, playlistName }) {
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
  let spot_uri = [];
  let user_id = "";
  let playlist_id = "";
  let d = new Date();
  if (!loading && !error) {
    let songs = data.topTracks.map(
      (song, index) =>
        // (song.name + " " + song.artist.name).replace(/\s/g, "%20")
        song.name + " " + song.artist.name
    );
    let total = { uris: spot_uri };
    spotify.setAccessToken(SpotifyFunctions.checkUrlForSpotifyAccessToken());
    songs.forEach((s) =>
      spotify.searchTracks(s, { limit: 1 }, function (err, data) {
        if (err) console.error(err);
        else spot_uri.push(data.tracks.items[0].uri);
      })
    );
    spotify
      .getMe()
      .then(function (data) {
        console.log(data.id);
        user_id = data.id;
      })
      .then(function () {
        spotify
          .createPlaylist(user_id, {
            name: playlistName,
            description: "Created with Spotify.FM " + `${period}`,
          })
          .then(
            function (data) {
              console.log(data);
              playlist_id = data.uri;
            },
            function (err) {
              console.error(err);
            }
          )
          .then(function () {
            spotify.addTracksToPlaylist(playlist_id, spot_uri.uris).then(
              function (data) {
                console.log(data);
              },
              function (err) {
                console.error(err);
              }
            );
          });
      });

    // spotify.createPlaylist(user_id, { name: playlistName }, function (
    //   err,
    //   data
    // ) {
    //   if (err) console.error(err);
    //   else console.log("Artist albums", data.tracks.items[0].uri);
    // });

    console.log(songs);
    console.log(total);
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
async function createPlaylist({ user_id, playlistName }) {
  spotify.createPlaylist(user_id, { name: playlistName }, function (err, data) {
    if (err) console.error(err);
    else console.log("Artist albums", data.tracks.items[0].uri);
  });
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    username: state.data.username,
    period: state.data.period,
    playlistName: state.data.playlistName,
    user_id: state.text.user_id,
  };
};

export default connect(mapStateToProps, { submitForm, userID })(
  LastFmData,
  createPlaylist
);
