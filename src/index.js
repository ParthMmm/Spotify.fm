import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./components/App";
import reducers from "./reducers";
import { Helmet } from "react-helmet";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <Helmet
      title="Spotify.FM Playlists"
      meta={[{ property: "og:title", content: "Home" }]}
      style={{ backgroundColor: "#000" }}
    ></Helmet>
    <App />
  </Provider>,
  document.querySelector("#root")
);
