import React from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { submitForm } from "../actions";
import { gql, useQuery } from "@apollo/client";
import * as SpotifyFunctions from "./spotifyFunctions";
import * as SpotifyWebApi from "spotify-web-api-js";
import Alert from "../components/Alert";
let spotify = new SpotifyWebApi();

const TOP_TRACKS = gql`
  query topTracks($username: String!, $period: String!) {
    topTracks(username: $username, period: $period) {
      name
      artist {
        name
      }
    }
  }
`;
function LastFmData({ username, period, playlistName }) {
  let spot_uri = [];
  let user_id = "";
  let playlist_id = "";
  const currDate = new Date().toLocaleString();
  const { loading, error, data } = useQuery(TOP_TRACKS, {
    variables: { username, period },
  });

  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div>
        <Alert />
      </div>
    );
  }

  if (!loading && !error) {
    const songs = data.topTracks.map(
      (song, index) =>
        // (song.name + " " + song.artist.name).replace(/\s/g, "%20")
        song.name + " " + song.artist.name
    );
    spotify.setAccessToken(SpotifyFunctions.checkUrlForSpotifyAccessToken());
    songs.forEach((s) =>
      spotify.searchTracks(s, { limit: 1 }, function (err, data) {
        if (err) console.error(err);
        else {
          try {
            spot_uri.push(data.tracks.items[0].uri);
          } catch (err) {
            console.error(err);
          }
        }
      })
    );

    spotify
      .getMe()
      .then(function (data) {
        user_id = data.id;
      })
      .then(function () {
        spotify
          .createPlaylist(user_id, {
            name: playlistName,
            description:
              "Created with Spotify.FM with " +
              `${period}` +
              " data from Last.FM. " +
              `${currDate}`,
          })
          .then(
            function (data) {
              playlist_id = data.id;
            },
            function (err) {
              console.error(err);
            }
          )
          .then(function () {
            spotify.addTracksToPlaylist(playlist_id, spot_uri).then(
              function (data) {},
              function (err) {
                console.error(err);
              }
            );
          });
      });
  }
  return (
    <div>
      <h3 className="header">Playlist Created!</h3>
      <p>
        Note: Sometimes songs may be missing or may be replaced with a remix.{" "}
      </p>
    </div>
  );
  // return <h1>serenity now</h1>;
}

const mapStateToProps = (state) => {
  return {
    username: state.data.username,
    period: state.data.period,
    playlistName: state.data.playlistName,
  };
};

export default connect(mapStateToProps, { submitForm })(LastFmData);
