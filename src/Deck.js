import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const new_deck_url =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const draw_card_url = (deck_id) =>
  `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [remaining, setRemaining] = useState(52);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  const getCard = async () => {
    if (deck && deck.deck_id) {
      const card = await axios.get(draw_card_url(deck.deck_id));
      setCard(card.data);
      setRemaining(card.data.remaining);
    }
  };

  useEffect(() => {
    async function getDeck() {
      let deck = await axios.get(new_deck_url);
      setDeck(deck.data);
    }
    getDeck();
  }, []);

  useEffect(() => {
    getCard();
  }, [deck]);

  useEffect(() => {
    if (autoDraw && remaining) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoDraw, remaining]);

  const toggleAutoDraw = () => {
    setAutoDraw((autoDraw) => !autoDraw);
  };

  return (
    <div>
      <button onClick={toggleAutoDraw}>Toggle Auto Draw</button>
      {card ? (
        <div>
          <img src={card.cards[0].image} alt={card.cards[0].code} />
          <p>Remaining: {remaining}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Deck;
