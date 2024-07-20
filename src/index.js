// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { Store } from "./store/Store";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.react_app_accesstoken}`;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
reportWebVitals();
