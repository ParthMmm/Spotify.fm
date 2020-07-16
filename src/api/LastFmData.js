import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { submitForm } from "../actions";

function LastFmData({ username, period }) {
  const [lfmData, updateLfmData] = useState({});

  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${username}&api_key=${process.env.REACT_APP_API_KEY}&limit=30&period=${period}&format=json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => updateLfmData(data))
      .catch(() =>
        updateLfmData({ error: "Whoops! Something went wrong with Last.fm" })
      );
  }, []);
  console.log(lfmData.toptracks);
  const { error } = lfmData;
  const tracks = lfmData?.toptracks;
  if (error) {
    return <p>error</p>;
  }
  if (!tracks) {
    return (
      <div>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }
  return <h1>serenity now</h1>;
  // return (
  //   <div>
  //     <Spinner animation="border" variant="success" />
  //   </div>
  // );
}
const mapStateToProps = (state) => {
  console.log(state);
  return { username: state.data.username, period: state.data.period };
};

export default connect(mapStateToProps, { submitForm })(LastFmData);
