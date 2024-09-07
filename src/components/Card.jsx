import React, { useState } from "react";
import cat_1_img from "../images/cat_1.jpg";
import cat_2_img from "../images/cat_2.jpeg";
import cat_3_img from "../images/cat_3.jpg";
import cat_4_img from "../images/cat_4.avif";
import cat_5_img from "../images/cat_5.avif";
import spinner from "../images/loader.gif";
const thumbnails = {
  "bank-draft": cat_1_img,
  "bill-of-lading": cat_2_img,
  invoice: cat_3_img,
  "bank-draft-2": cat_4_img,
  "bill-of-lading-2": cat_5_img,
};

const Card = ({ card, onCardClick }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => setLoading(false);

  return (
    <div className="card" onClick={() => onCardClick(thumbnails[card.type])}>
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
