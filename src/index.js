import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider, LikeSaveProvider } from "./Context";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <LikeSaveProvider>
          <App />
        </LikeSaveProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
