import React from "react";

const Card = ({image, suit, value}) => {
    return (
        <div name={suit + value} className="card">
            <img src={image}/>
        </div>
    )
}

export default Card;