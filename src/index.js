import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./DataProvider";
import { LikeSaveProvider } from "./Like&SaveProvider";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <LikeSaveProvider>
        <App />
      </LikeSaveProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
