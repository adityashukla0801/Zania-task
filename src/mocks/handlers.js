// src/mocks/handlers.js
import { rest } from "msw";

const getStoredData = () => JSON.parse(localStorage.getItem("cards")) || [];
const setStoredData = (data) =>
  localStorage.setItem("cards", JSON.stringify(data));

export const handlers = [
  rest.get("/api/cards", (req, res, ctx) => {
    const cards = getStoredData();
    return res(ctx.status(200), ctx.json(cards));
  }),

  rest.post("/api/cards", (req, res, ctx) => {
    try {
      const newCards = JSON.parse(req.body);
      setStoredData(newCards);
      return res(ctx.status(200), ctx.json({ message: "Success" }));
    } catch (error) {
      console.error("Failed to save data:", error);
      return res(ctx.status(500), ctx.json({ error: "Failed to save data" }));
    }
  }),
];
