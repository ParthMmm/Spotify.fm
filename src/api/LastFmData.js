import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { submitForm } from "../actions";
import { gql, useQuery } from "@apollo/client";

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
  console.log(username);
  console.log(period);
  const { loading, error, data } = useQuery(TOP_TRACKS, {
    variables: { username, period },
  });
  console.log(data);
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

  return <h1>serenity now</h1>;
}
const mapStateToProps = (state) => {
  console.log(state);
  return { username: state.data.username, period: state.data.period };
};

export default connect(mapStateToProps, { submitForm })(LastFmData);
