import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { unregister } from "./registerServiceWorker";
import Root from "./Root";
import store from "./store";
import { HONEYBADGER_API_KEY, HONEYBADGER_ENV } from "./services/global-vars";
import Honeybadger from "honeybadger-js";

Honeybadger.configure({
  apiKey: HONEYBADGER_API_KEY,
  environment: HONEYBADGER_ENV,
});
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
//registerServiceWorker();
unregister();
