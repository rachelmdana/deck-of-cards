import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [shuffling, setShuffling] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
      .then((response) => response.json())
      .then((data) => {
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
      });
  }, []);

  const drawCard = () => {
    if (remaining > 0) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
        .then((response) => response.json())
        .then((data) => {
          setRemaining(data.remaining);
          setDrawnCard(data.cards[0]);
        });
    } else {
      alert('Error: no cards remaining!');
    }
  };

  const shuffleDeck = () => {
    if (!shuffling) {
      setShuffling(true);
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then((response) => response.json())
        .then(() => {
          setRemaining(52);
          setDrawnCard(null);
          setShuffling(false);
        });
    }
  };

  return (
    <div className="app-container">
      <div className="card">{drawnCard ? <img src={drawnCard.image} alt="drawn card" /> : null}</div>
      <div>
        <button className="action-button" onClick={drawCard}>
          Draw a Card
        </button>
        <button className="action-button" onClick={shuffleDeck} disabled={shuffling}>
          Shuffle Deck
        </button>
      </div>
    </div>
  );
};

export default App;
