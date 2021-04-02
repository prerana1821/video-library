import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./DataProvider";
import { LikeSaveProvider } from "./Like&SaveProvider";
import { PlaylistProvider } from "./PlaylistProvider";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <PlaylistProvider>
        <LikeSaveProvider>
          <App />
        </LikeSaveProvider>
      </PlaylistProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
