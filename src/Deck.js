import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Card from './Card';


const Deck = () => {
    //The array of drawn cards
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(0);

    //to capture the ID to send to the API
    const deckId = useRef();

    //We only want to grab a new deck when the component is mounted.
    useEffect(function obtainDeck() {
        async function shuffleNew() {
            try {
                const {data} = await axios.get(
                    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
                );
                //sets the deckId so we aren't constantly grabbing new decks
                deckId.current = data.deck_id;
                //sets the remaining amount of cards in the deck
                setRemaining(data.remaining);
            } catch (e) {
                alert(e);
            }
        }
        shuffleNew();
    }, []);

    //Draws a single card, adds it to cards, and changes remaining to reflect the remaining deck
    async function drawCard() {
        try {
            const {data} = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deckId.current}/draw`
            );
            console.log(data);
            const card = data.cards[0];
            setCards([...cards, {
                code : card.code,
                image : card.image,
                suit : card.suit,
                value : card.value
            }]);
            setRemaining(data.remaining);
        } catch (e) {
            alert(e);
        }
    }

    //Shuffle the deck and reset cards and remaining
    async function shuffle() {
        try {
            const {data} = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`
            );
            setCards([]);
            setRemaining(data.remaining);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <>
            {remaining > 0 
                ? <button onClick={drawCard}>Draw</button>
                : <button onClick={shuffle}>ReShuffle</button>
            }
            {cards.map(c => (
                <Card 
                    key={c.code}
                    image={c.image}
                    suit={c.suit}
                    value={c.value} 
                />))
            }
        </>
    )
}

export default Deck;