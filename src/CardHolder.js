import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import Card from './Card'
import allCards from './AllCards' // delete this line eventually, once test card is done



class CardHolder extends React.Component {


   // should this method be here? Or in App?
   deleteItem = (id) => {
      console.log(id);
   }



   render() {


      const cardSlots = [];

      const holderStyle = {
         border: "1px solid black",
         padding: "1px"
      }


      for (let i = 1; i < 6; i++) {
         cardSlots.push(
            <div
               className="card-slot"
               style={{ marginBottom: i === 5 ? '0px' : '1px' }}
               key={i}
            >
               <Card
                  id={i}
                  handleDrop={(id) =>
                     this.deleteItem(id)
                  }
                  numbers={allCards[0].numbers}
               />
            </div>
         )
      }


      return (
         <div className="cardHolder" style={holderStyle}>
            {cardSlots}
         </div>

      )
   }
}

export default CardHolder