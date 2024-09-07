import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./mocks/browser";

// Initialize the service worker in development mode
if (process.env.NODE_ENV === "development") {
  worker.start();
}

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
