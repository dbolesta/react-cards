import React, { Component } from "react";
import BoardSpace from "./BoardSpace";
import ScoreBoard from "./ScoreBoard";
import Card from "./Card";
import * as utils from "../utils";

// Only necessary for testing
// import Card from './Card'
// import allCards from '../AllCards'

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.renderBoardSpace = this.renderBoardSpace.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.handleReceive = this.handleReceive.bind(this);
  }

  handleDrop = id => {
    console.log("find me");
    console.log(id);
  };

  handleReceive() {
    // dont atually need this function, can probably delete? maybe
    console.log("handle receive!!");
  }

  renderCard(x, y, board) {
    //  console.log("INSIDE RENDER CARD");
    //  console.log(board[x][y]);
    if (board[x][y]) {
      return (
        <Card
          cardData={utils.getCardById(board[x][y].id)}
          inPlay={true}
          waitingToBeSelected={board[x][y].waitingToBeSelected}
        />
      );
    }
  }

  renderBoardSpace(i, board) {
    const y = i % 4;
    const x = Math.floor(i / 4);

    //const tester = board[x][y];
    // console.log("tester at " + x + "-" + y + " is:");
    // console.log(tester);
    //console.log("Render Board Space function " + x + "-" + y);

    //  console.log("Inside renderBoardSpace. Board is: ");
    //  console.log(board);

    return (
      <BoardSpace
        x={x}
        y={y}
        key={i}
        position={x + "-" + y}
        onReceive={this.handleReceive}
      >
        {/* {tester} */}
        {this.renderCard(x, y, board)}
      </BoardSpace>
    );
  }

  render() {
    // console.log("figurung out state");
    // console.log(this.state.board[1][1]);

    console.log("INSIDE BOARD, BOARD IS BEING RENDERED!");

    console.log(this.props.board);

    const boardSpaces = [];
    for (let i = 0; i < 16; i++) {
      boardSpaces.push(this.renderBoardSpace(i, this.props.board));
    }

    return (
      <div className="card-board-container">
        <div className="score-board">
          <ScoreBoard score={this.props.score} />
        </div>

        <div className="card-board">{boardSpaces}</div>
      </div>
    );
  }
}

export default Board;
