import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { unregister } from "./registerServiceWorker";
import Root from "./Root";
import store from "./store";
import {
  HONEYBADGER_API_KEY,
  HONEYBADGER_ENV,
  HONEYBADGER_REVISION,
} from "./services/global-vars";
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react";

const honeybadger = Honeybadger.configure({
  apiKey: HONEYBADGER_API_KEY,
  environment: HONEYBADGER_ENV,
  revision: HONEYBADGER_REVISION,
});

ReactDOM.render(
  <HoneybadgerErrorBoundary honeybadger={honeybadger}>
    <Root store={store} />
  </HoneybadgerErrorBoundary>,
  document.getElementById("root")
);
//registerServiceWorker();
unregister();
