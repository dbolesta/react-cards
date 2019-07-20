import React from "react";
import Card from "./Card";
import * as utils from "../utils";

function CardHolder(props) {
  // should this function be here? Or in App?
  function handleDrop(index, player, bxy, id) {
    props.onPlayCard(index, player, bxy, id);
    getNeighbours(bxy);
    console.log("Handle Drop Being Called from CardHolder.js");
  }

  function getNeighbours(bxy) {
    console.log(
      "Get neighbots from the position of " + bxy.x + " and " + bxy.y
    );
  }

  function renderCard(i, hand, player) {
    if (hand[i] === null) return;

    let chosenCard = utils.getCardById(hand[i]);
    chosenCard.owner = player;
    return (
      <Card
        cardData={chosenCard}
        onDrop={(index, p, bxy, id) => handleDrop(index, p, bxy, id)}
        inPlay={false}
        index={i}
        waitingToBeSelected={false}
      />
    );
  }

  console.log(
    "%c HEY DAMON WHATS UP",
    "font-size: 16px; color: red;"
  );
  console.log(props);
  const { player, hand } = props;

  // console.log("hand for " + player);
  // console.log(hand);

  const cardSlots = [];

  for (let i = 0; i < 5; i++) {
    cardSlots.push(
      <div
        className="card-slot"
        style={{ marginBottom: i === 5 ? "0px" : "1px" }}
        key={i}
      >
        {renderCard(i, hand, player)}
      </div>
    );
  }

  return (
    <div className="card-holder-container">
      <p>Player {player}</p>
      <div className="card-holder">{cardSlots}</div>
    </div>
  );
}

export default CardHolder;
