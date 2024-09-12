import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import cat_1_img from "../images/cat_1.jpg";
import cat_2_img from "../images/cat_2.jpeg";
import cat_3_img from "../images/cat_3.jpg";
import cat_4_img from "../images/cat_4.avif";
import cat_5_img from "../images/cat_5.avif";
import spinner from "../images/loader.gif";

const ItemTypes = {
  CARD: "card",
};

const thumbnails = {
  "bank-draft": cat_1_img,
  "bill-of-lading": cat_2_img,
  invoice: cat_3_img,
  "bank-draft-2": cat_4_img,
  "bill-of-lading-2": cat_5_img,
};

const Card = ({ card, index, setCards, cards, onCardClick, setLastSaved }) => {
  const [loading, setLoading] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        const newCards = [...cards];
        const [removed] = newCards.splice(draggedItem.index, 1);
        newCards.splice(index, 0, removed);

        setCards(newCards);

        draggedItem.index = index; // Update the index of the dragged item
        localStorage.setItem("cards", JSON.stringify(newCards));
        const now = new Date();
        setLastSaved(now.toLocaleTimeString()); // Update last saved time
      }
    },
  });

  const handleImageLoad = () => setLoading(false);

  return (
    <div
      className="card"
      onClick={() => onCardClick(thumbnails[card.type])}
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1, // Keep the CSS transition effect
        transition: "opacity 0.2s ease", // Smooth transition for drag effect
      }}
    >
      {loading && (
        <div className="spinner">
          <img src={spinner} alt="spinner" />
        </div>
      )}
      <h3>{card.title}</h3>
      <img
        src={thumbnails[card.type]}
        alt={card.title}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
};

export default Card;
