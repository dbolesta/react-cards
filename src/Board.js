import React, { Component } from 'react'
import BoardSpace from './BoardSpace'







class Board extends Component {
   render() {

      const boardSlots = [];

      for (var i = 1; i < 5; i++) {
         for (var j = 1; j < 5; j++) {
            boardSlots.push(
               <BoardSpace x={i} y={j} />
            )
         }


      }


      return (
         <div className="card-board">
            {boardSlots}
         </div>

      )
   }
}

export default Board
