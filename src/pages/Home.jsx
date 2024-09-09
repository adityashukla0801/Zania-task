import React, { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const cardsContainerRef = useRef(null); // useRef for the container

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch data from the mock API
        const response = await fetch("/api/cards");

        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();

        // If data exists, update the state and localStorage
        if (data.length) {
          setCards(data);
          localStorage.setItem("cards", JSON.stringify(data));
        }
      } catch (error) {
        // If API fails, fallback to loading from localStorage or JSON file
        console.error(
          "Error fetching data from API, falling back to localStorage:",
          error
        );

        let localData = JSON.parse(localStorage.getItem("cards"));

        if (!localData) {
          // If no data in localStorage, load it from the JSON file
          const response = await fetch("/data.json");
          localData = await response.json();
          localStorage.setItem("cards", JSON.stringify(localData));
        }

        setCards(localData.map((card) => ({ ...card })));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cardsContainerRef.current) {
      const sortable = Sortable.create(cardsContainerRef.current, {
        animation: 500,
        onEnd: (evt) => {
          const newOrder = [...cards];
          const [removed] = newOrder.splice(evt.oldIndex, 1); // Remove the dragged card
          newOrder.splice(evt.newIndex, 0, removed); // Insert at new position

          setCards(newOrder); // Update the state with reordered cards
          localStorage.setItem("cards", JSON.stringify(newOrder));
        },
      });

      return () => sortable.destroy();
    }
  }, [cards]);

  const handleCardClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const saveData = () => {
      setIsSaving(true);
      fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify(cards),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        })
        .finally(() => {
          setIsSaving(false);
        });
    };

    const interval = setInterval(() => {
      saveData();
    }, 5000);

    return () => clearInterval(interval);
  }, [cards]);

  return (
    <div className="App">
      {/* Attach the ref to the cards container */}
      <div ref={cardsContainerRef} id="cards-container" className="card-grid">
        {cards.map((card, index) => (
          <Card key={card.type} card={card} onCardClick={handleCardClick} />
        ))}
      </div>

      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}

      {isSaving && <div className="spinner">Saving...</div>}
    </div>
  );
}

export default Home;
