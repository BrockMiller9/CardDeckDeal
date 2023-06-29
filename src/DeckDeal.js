import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function getData() {
      let data = await axios.get(`${API_BASE_URL}/new/shuffle/`);

      console.log(data.data);

      setDeck(data.data);
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      if (deck) {
        let { deck_id } = deck;

        try {
          let drawRes = await axios.get(
            `${API_BASE_URL}/${deck_id}/draw/?count=1`
          );
          console.log(drawRes.data);
          if (drawRes.data.remaining === 0) {
            setAutoDraw(false);
            throw new Error("No cards remaining!");
          }

          const card = drawRes.data.cards[0];

          setDrawn((data) => [
            ...data,
            {
              id: card.code,
              name: card.suit + " " + card.value,
              image: card.image,
            },
          ]);
        } catch (err) {
          alert(err);
        }
      }
    }

    if (autoDraw && !timerRef.current && deck) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoDraw, setAutoDraw, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
    console.log(autoDraw);
  };

  const cards = drawn.map((c) => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div>
      {deck ? (
        <button onClick={toggleAutoDraw}>
          {autoDraw ? "STOP" : "KEEP"} DRAWING FOR ME!
        </button>
      ) : null}
      <div>{cards}</div>
    </div>
  );
}

export default Deck;
