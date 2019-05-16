import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import ScoreBoard from './ScoreBoard'
import Card from './Card'
import * as utils from './utils'

// Only necessary for testing
// import Card from './Card'
// import allCards from './AllCards' 



function renderBoardSpace(i, board) {
   const x = i % 4
   const y = Math.floor(i / 4)

   const tester = board[x][y];
   console.log("tester at " + x + "-" + y + " is:");
   console.log(tester);


   return (
      <BoardSpace
         x={x}
         y={y}
         key={i}
         position={x + "-" + y}
      >
         {/* {tester} */}
         {renderCard(x, y, board)}
      </BoardSpace>
   )
}

function renderCard(x, y, board) {
   if (board[x][y]) {
      return (
         <Card
            cardData={utils.getCardById(board[x][y])}
         />
      )
   }
}

class Board extends Component {
   constructor(props) {
      super(props);
   }



   render() {

      // const boardSpaces = [];

      // for (var i = 1; i < 5; i++) {
      //    for (var j = 1; j < 5; j++) {
      //       boardSpaces.push(
      //          <BoardSpace
      //             x={i}
      //             y={j}
      //             key={i + "-" + j}
      //          />
      //       )
      //    }
      // }

      console.log("figurung out state");
      console.log(this.props.board[1][1]);

      const boardSpaces = []
      for (let i = 0; i < 16; i++) {
         boardSpaces.push(renderBoardSpace(i, this.props.board))
      }


      return (
         <div className="card-board-container">

            <div className="score-board">
               <ScoreBoard
                  score={this.props.score}
               />
            </div>

            <div className="card-board">
               {boardSpaces}
            </div>


         </div>


      )
   }
}

export default Board
