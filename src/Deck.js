import React, { useState } from 'react';
import Card from './Card';

const Deck = () => {
    const [cards, setCards] = useState([]);
    return (
        <>
            <Card />
        </>
    )
}

export default Deck;