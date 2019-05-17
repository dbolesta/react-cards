import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import Card from './Card'
import allCards from './AllCards'
import * as utils from './utils'

class CardHolder extends React.Component {


   // should this method be here? Or in App?
   deleteItem = (id) => {
      console.log(id);
   }



   render() {

      const { player, hand } = this.props;


      console.log("hand for " + player);
      console.log(hand);

      const cardSlots = [];


      for (let i = 1; i < 6; i++) {

         //let chosenCard = allCards[utils.getRandomIntInclusive(0, allCards.length - 1)];

         //let chosenCard = utils.getRandomCard();

         let chosenCard = utils.getCardById(hand[i - 1])

         chosenCard.owner = player;

         cardSlots.push(
            <div
               className="card-slot"
               style={{ marginBottom: i === 5 ? '0px' : '1px' }}
               key={i}
            >
               <Card
                  handleDrop={(id) =>
                     this.deleteItem(id)
                  }
                  cardData={chosenCard}
               />
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