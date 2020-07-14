import React from 'react';
import ReactCardFlip from "react-card-flip";
import {Image} from 'semantic-ui-react'

const Card = ({ villager, isFlipped, handleFlip, match }) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={0.4} flipSpeedFrontToBack={0.4} >
      <div className="front-card" onClick={() => handleFlip(villager)}>
        <Image src={process.env.PUBLIC_URL + `/assets/cards/card.jpg`} alt="card"/>
      </div>
      <div className={match ? "matched-card" : "back-card"}>
        <Image src={process.env.PUBLIC_URL + `/assets/villager_images/villager_${villager.villagerId}.png`} alt="card"/>
      </div>
    </ReactCardFlip>
  )
}



export default Card;
