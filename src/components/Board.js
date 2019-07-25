import React from 'react';
import BoardSpace from './BoardSpace';
import ScoreBoard from './ScoreBoard';
import Card from './Card';
import * as utils from '../utils';

// Only necessary for testing
// import Card from './Card'
// import allCards from '../AllCards'

function Board(props) {
  const { score, board, onSelectCard } = props;

  // dont think this is being used
  function handleDrop(id) {
    console.log('%c find me', 'font-size:30px; color: blue');
    console.log(id);
  }

  // dont atually need this function, can probably delete? maybe
  function handleReceive() {
    console.log(
      '%c handle receive!!',
      'font-size: 30px; color: purple'
    );
  }

  // function selectCard() {
  //   console.log("hh");
  //   alert("selected card");
  // }

  function renderCard(x, y, board) {
    // will only actually render card if there is card to render
    // otherwise the following code will not run, and an empty BoardSpace will be created
    if (board[x][y]) {
      // console.log(
      //   '%c Checking Board xy',
      //   'font-size: 20px; color: blue'
      // );
      // console.log(board[x][y]);
      let chosenCard = utils.getCardById(board[x][y].id);
      chosenCard.owner = board[x][y].player;

      console.log(
        '%c Rendering Card in board...',
        'font-size:30px; color: blue'
      );
      console.log(board[x][y]);
      console.log(chosenCard);

      return (
        <Card
          cardData={utils.getCardById(board[x][y].id)}
          inPlay={true}
          waitingToBeSelected={board[x][y].waitingToBeSelected}
          onClickCard={
            board[x][y].waitingToBeSelected ? onSelectCard : undefined
          }
          position={x + '-' + y}
        />
      );
    }
  }

  function renderBoardSpace(i, board) {
    const y = i % 4;
    const x = Math.floor(i / 4);
    console.log(
      `%c <BoardSpace> ${x}-${y} is about to render`,
      'font-size:14px; color: purple'
    );

    return (
      <BoardSpace
        x={x}
        y={y}
        key={x + '-' + y}
        position={x + '-' + y}
      >
        {renderCard(x, y, board)}
      </BoardSpace>
    );
  }

  const boardSpaces = [];
  for (let i = 0; i < 16; i++) {
    // console.log("looping board spaces :)");
    // console.log(board);
    boardSpaces.push(renderBoardSpace(i, board));
  }

  return (
    <div className="card-board-container">
      <div className="score-board">
        <ScoreBoard score={score} />
      </div>

      <div className="card-board">{boardSpaces}</div>
    </div>
  );
}

export default Board;
