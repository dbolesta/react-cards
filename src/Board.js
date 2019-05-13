import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import ScoreBoard from './ScoreBoard'

// Only necessary for testing
// import Card from './Card'
// import allCards from './AllCards' 






class Board extends Component {
   render() {

      const boardSpaces = [];

      for (var i = 1; i < 5; i++) {
         for (var j = 1; j < 5; j++) {
            boardSpaces.push(
               <BoardSpace
                  x={i}
                  y={j}
                  key={i + "-" + j}
               />
            )
         }
      }

      const boardContainerStyle = {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center'
      }

      return (
         <div className="card-board-container" style={boardContainerStyle}>

            <div className="score-board">
               <ScoreBoard />
            </div>

            <div className="card-board">
               {boardSpaces}
            </div>



            {/* <br />
            <p>test card</p>
            <Card
               id={99}
               handleDrop={(id) =>
                  this.deleteItem(id)
               }
               numbers={allCards[0].numbers}
            />
            <br /><br /><br /><br /><br /><br /><br /><br /> */}
         </div>


      )
   }
}

export default Board
