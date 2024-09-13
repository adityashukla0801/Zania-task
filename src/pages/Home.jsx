import Sortable from "sortablejs";
import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null); // New state for last saved time
  const cardsContainerRef = useRef(null); // useRef for the container

  // Fetch card data from the mock API or local storage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cards");

        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();

        if (data.length) {
          setCards(data);
          localStorage.setItem("cards", JSON.stringify(data));
        }
      } catch (error) {
        console.error(
          "Error fetching data from API, falling back to localStorage:",
          error
        );

        let localData = JSON.parse(localStorage.getItem("cards"));

        if (!localData) {
          const response = await fetch("/data.json");
          localData = await response.json();
          localStorage.setItem("cards", JSON.stringify(localData));
        }

        setCards(localData.map((card) => ({ ...card })));
      }
    };

    fetchData();
  }, []);

  // Handle card drag and drop (SortableJS)
  useEffect(() => {
    if (cardsContainerRef.current) {
      const sortable = Sortable.create(cardsContainerRef.current, {
        animation: 500, // Increase animation duration
        easing: "ease-out", // Smooth easing for more natural feel
        onEnd: (evt) => {
          const newOrder = [...cards];
          const [removed] = newOrder.splice(evt.oldIndex, 1);
          newOrder.splice(evt.newIndex, 0, removed);

          // Delay updating the state to allow smooth transition
          setTimeout(() => {
            setCards(newOrder);
            localStorage.setItem("cards", JSON.stringify(newOrder));
          }, 100); // Delay to let CSS transition happen
        },
      });

      return () => sortable.destroy();
    }
  }, [cards]);

  // Handle card click to show the image in modal
  const handleCardClick = (image) => {
    setSelectedImage(image);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Auto-save card data to the mock API every 5 seconds
  useEffect(() => {
    const now = new Date();
    setLastSaved(now.toLocaleTimeString()); // Update last saved time

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
          const now = new Date();
          setLastSaved(now.toLocaleTimeString()); // Update last saved time
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
      <header>
        <h1>Card Manager</h1>
        {/* Display the last saved time */}
        {lastSaved && <p>Last saved at: {lastSaved}</p>}
        {isSaving && <p className="saving-status">Saving...</p>}
      </header>

      {/* Attach the ref to the cards container */}
      <div ref={cardsContainerRef} id="cards-container" className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={card.type}
            card={card}
            onCardClick={handleCardClick}
            setLastSaved={setLastSaved}
          />
        ))}
      </div>

      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;
