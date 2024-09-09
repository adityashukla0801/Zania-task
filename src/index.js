import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./mocks/browser";

// Initialize the service worker in development mode
if (process.env.NODE_ENV === "development") {
  worker.start({
    onUnhandledRequest: "bypass", // This ensures unhandled requests bypass the mock
  });

  // Add the event listeners to track requests
  worker.events.on("request:start", (req) => {
    console.log("Request started:", req.url.href);
  });

  worker.events.on("request:match", (req) => {
    console.log("Request matched:", req.url.href);
  });

  worker.events.on("request:unhandled", (req) => {
    console.warn("Unhandled request:", req.url.href);
  });
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
