import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import Card from './Card'
import allCards from './AllCards'
import * as utils from './utils'

class CardHolder extends React.Component {
   constructor(props) {
      super(props);
      this.renderCard = this.renderCard.bind(this);
   }


   // should this method be here? Or in App?
   handleDrop = (index, player, bxy, id) => {
      //console.log("Should delete the " + index + " card for player " + player);
      this.props.onPlayCard(index, player, bxy, id);
   }


   renderCard(i, hand, player) {
      if (hand[i] === null) return;

      let chosenCard = utils.getCardById(hand[i]);
      chosenCard.owner = player;
      return (
         <Card
            cardData={chosenCard}
            onDrop={(index, p, bxy, id) =>
               this.handleDrop(index, p, bxy, id)
            }
            inPlay={false}
            index={i}
         />
      )
   }



   render() {

      const { player, hand } = this.props;


      // console.log("hand for " + player);
      // console.log(hand);

      const cardSlots = [];


      for (let i = 0; i < 5; i++) {
         cardSlots.push(
            <div
               className="card-slot"
               style={{ marginBottom: i === 5 ? '0px' : '1px' }}
               key={i}
            >
               {this.renderCard(i, hand, player)}
            </div>
         )
      }


      return (
         <div className="card-holder-container">
            <p>Player {player}</p>
            <div className="card-holder">
               {cardSlots}
            </div>
         </div>
      )
   }
}

export default CardHolder