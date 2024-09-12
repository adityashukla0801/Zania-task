// mocks/browser.js
import { setupWorker } from "msw";
import { handlers } from "./handlers";

// Configure the worker to handle requests
export const worker = setupWorker(...handlers);
