// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { worker } from "./mocks/browser";

// Start the MSW worker
worker.start();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
