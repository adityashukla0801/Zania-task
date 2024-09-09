import { rest } from "msw";

// Utility to get data from localStorage
const getStoredData = () => {
  const storedData = localStorage.getItem("cards");
  return storedData ? JSON.parse(storedData) : [];
};

// Utility to store data in localStorage
const setStoredData = (data) => {
  localStorage.setItem("cards", JSON.stringify(data));
};

export const handlers = [
  // Mock GET request to fetch data from localStorage
  rest.get("/api/cards", (req, res, ctx) => {
    const cards = getStoredData();
    return res(
      ctx.status(200),
      ctx.json(cards),
      ctx.set("Access-Control-Allow-Origin", "*") // CORS Header
    );
  }),

  // Mock POST request to add data to localStorage
  rest.post("/api/cards", (req, res, ctx) => {
    const newCard = req.body;
    const currentData = getStoredData();
    const updatedData = [...currentData, newCard];
    setStoredData(updatedData);
    return res(
      ctx.status(201),
      ctx.json(newCard),
      ctx.set("Access-Control-Allow-Origin", "*") // CORS Header
    );
  }),
];

// API Design for Long-term Maintenance
// Design endpoints to handle:

// GET /api/cards: Fetch all cards.
// POST /api/cards: Add a new card.
// PUT /api/cards/{id}: Update an existing card.
// DELETE /api/cards/{id}: Remove a card.
