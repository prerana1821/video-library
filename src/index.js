import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./DataProvider";
import { LikeSaveProvider } from "./Like&SaveProvider";
import { PlaylistProvider } from "./PlaylistProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <PlaylistProvider>
          <LikeSaveProvider>
            <App />
          </LikeSaveProvider>
        </PlaylistProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
