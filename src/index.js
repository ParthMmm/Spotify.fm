import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./components/App";
import reducers from "./reducers";
import { Helmet } from "react-helmet";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from "@apollo/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

const client = new ApolloClient({
  uri: "https://spotify-fm.herokuapp.com/",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query topTracks {
//         topTracks(username: "parth_m", period: "1month") {
//           name
//           artist {
//             name
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result.data.topTracks));

ReactDOM.render(
  <Provider store={store}>
    <Helmet
      title="Spotify.FM Playlists"
      meta={[{ property: "og:title", content: "Home" }]}
    >
      <style>{"body { background-color: gray; }"}</style>
    </Helmet>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.querySelector("#root")
);
