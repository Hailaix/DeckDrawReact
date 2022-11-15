import React, { useState } from "react";
import './Card.css';

const Card = ({ image, suit, value }) => {
    const [angle, setAngle] = useState(Math.random() * 90 - 45);

    return (
        <div name={suit + value} className="card">
            <img src={image} alt={value + " of " + suit} style={{ transform: `rotate(${angle}deg)` }} />
        </div>
    )
}

export default Card;