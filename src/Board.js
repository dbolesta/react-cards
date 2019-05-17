import React, { Component } from 'react'
import BoardSpace from './BoardSpace'
import ScoreBoard from './ScoreBoard'
import Card from './Card'
import * as utils from './utils'

// Only necessary for testing
// import Card from './Card'
// import allCards from './AllCards' 


class Board extends Component {
   constructor(props) {
      super(props);
      this.deleteItem = this.deleteItem.bind(this);
      this.renderBoardSpace = this.renderBoardSpace.bind(this);
      this.renderCard = this.renderCard.bind(this);
      this.state = {
         board: [
            [null, null, null, null],
            [null, 7, 8, 9],
            [10, 11, null, null],
            [null, null, 69, null]
         ]
      }
   }

   deleteItem = (id) => {
      console.log(id);
   }

   renderCard(x, y, board) {
      if (board[x][y]) {
         return (
            <Card
               cardData={utils.getCardById(board[x][y])}
               handleDrop={(id) =>
                  this.deleteItem(id)
               }
            />
         )
      }
   }

   renderBoardSpace(i, board) {
      const y = i % 4
      const x = Math.floor(i / 4)

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
            {this.renderCard(x, y, board)}
         </BoardSpace>
      )
   }



   render() {

      console.log("figurung out state");
      console.log(this.state.board[1][1]);

      const boardSpaces = []
      for (let i = 0; i < 16; i++) {
         boardSpaces.push(this.renderBoardSpace(i, this.state.board))
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
