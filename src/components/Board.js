import React from "react";
import BoardSpace from "./BoardSpace";
import ScoreBoard from "./ScoreBoard";
import Card from "./Card";
import * as utils from "../utils";

// Only necessary for testing
// import Card from './Card'
// import allCards from '../AllCards'

function Board(props) {
  // dont think this is being used
  function handleDrop(id) {
    console.log("%c find me", "font-size:30px; color: blue");
    console.log(id);
  }

  // dont atually need this function, can probably delete? maybe
  function handleReceive() {
    console.log(
      "%c handle receive!!",
      "font-size: 30px; color: purple"
    );
  }

  function renderCard(x, y, board) {
    if (board[x][y]) {
      return (
        <Card
          cardData={utils.getCardById(board[x][y].id)}
          inPlay={true}
        />
      );
    }
  }

  function renderBoardSpace(i, board) {
    const y = i % 4;
    const x = Math.floor(i / 4);

    return (
      <BoardSpace
        x={x}
        y={y}
        key={x + "-" + y}
        position={x + "-" + y}
      >
        {renderCard(x, y, board)}
      </BoardSpace>
    );
  }

  console.log(
    "%c INSIDE BOARD, BOARD IS BEING RENDERED!",
    "font-size: 14px; color: blue;"
  );
  console.log(props.board);

  const boardSpaces = [];
  for (let i = 0; i < 16; i++) {
    boardSpaces.push(renderBoardSpace(i, props.board));
  }

  return (
    <div className="card-board-container">
      <div className="score-board">
        <ScoreBoard score={props.score} />
      </div>

      <div className="card-board">{boardSpaces}</div>
    </div>
  );
}

export default Board;
