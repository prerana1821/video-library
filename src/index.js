import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider, LikeSaveProvider } from "./Context";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./Auth/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <LikeSaveProvider>
            <App />
          </LikeSaveProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
