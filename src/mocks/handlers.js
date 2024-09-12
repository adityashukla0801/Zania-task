// mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Mock GET request for fetching cards
  rest.get("/api/cards", (req, res, ctx) => {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    return res(
      ctx.status(200),
      ctx.json(cards) // Send the cards stored in local storage
    );
  }),

  // Mock POST request for saving cards
  rest.post("/api/cards", (req, res, ctx) => {
    const updatedCards = req.body;
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    return res(
      ctx.status(200),
      ctx.json({ message: "Cards saved successfully" })
    );
  }),
];
