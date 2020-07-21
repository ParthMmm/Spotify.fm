require("dotenv").config();

export function redirectUrlToSpotifyForLogin() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SCOPES = "playlist-modify-private playlist-modify-public";

  return (
    "https://accounts.spotify.com/authorize" +
    "?response_type=token" +
    "&client_id=" +
    CLIENT_ID +
    "&scope=" +
    SCOPES +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI)
  );
}

export function checkUrlForSpotifyAccessToken() {
  const params = getHashParams();

  const accessToken = params.access_token;
  if (!accessToken) {
    return false;
  } else {
    return accessToken;
  }
}

function getHashParams() {
  //helper function to parse the query string that spotify sends back when you log in
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  // eslint-disable-next-line
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
}
