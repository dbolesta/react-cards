import React, { Component } from 'react';
import Card from './components/Card';
import CardHolder from './components/CardHolder';
import Board from './components/Board';
import './App.css';
import './Card.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import allCards from './AllCards';
import update from 'immutability-helper';
import * as utils from './utils';
import * as game from './game';

const randArr = utils.getUniqueRandomArray(10);

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePlayCard = this.handlePlayCard.bind(this);
    this.state = {
      board: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      p1hand: [
        randArr[0],
        randArr[1],
        randArr[2],
        randArr[3],
        randArr[4]
      ],
      p2hand: [
        randArr[6],
        randArr[7],
        randArr[8],
        randArr[9],
        randArr[10]
      ],
      score: {
        p1: 9,
        p2: 123
      },
      gameState: 'playing'
    };
  }

  // runAfterSetState(player, bxy, id) {
  //   let spaces = game.adjacentSpaces(bxy);

  //   console.log("Adjacent Spaces:");
  //   console.log(spaces);

  //   let enemies = game.getEnemyCards(
  //     spaces,
  //     this.state.board,
  //     player
  //   );
  //   console.log("Enemy Neighbors:");
  //   console.log(enemies);

  //   let attacksAndCaptures = game.determineAttacksAndCaptures(
  //     enemies,
  //     id
  //   );
  //   console.log("Attacks & Captures:");
  //   console.log(attacksAndCaptures);

  //   if (attacksAndCaptures.attacks.length > 1) {
  //     console.log("Need to select an attack!!");

  //     // make deep copy of board state
  //     let boardState = JSON.parse(JSON.stringify(this.state.board));
  //     let objToAdd = { waitingToBeSelected: true };

  //     attacksAndCaptures.attacks.map(card => {
  //       // console.log("select card at " + card.x + " " + card.y + "?");
  //       // console.log(boardState[card.x][card.y]);
  //       //boardState[card.x][card.y].waitingToBeSelected = true;
  //       console.log("Mapping AttacksAndCaptures");
  //       this.setState({
  //         board: update(this.state.board, {
  //           [card.x]: { [card.y]: { $merge: objToAdd } }
  //         })
  //       });
  //     });

  //     console.log("ALL DONE");

  //     console.log(this.state.board);

  //     // this.setState(
  //     //   {
  //     //     board: update(this.state.board, { $set: boardState })
  //     //   }
  //     // );
  //     // this.setState({
  //     //   board: boardState
  //     // });

  //     //selectAttack(attacksAndCaptures.attacks, currentCard, attacksAndCaptures.captures);
  //   } else if (
  //     attacksAndCaptures.attacks.length > 0 ||
  //     attacksAndCaptures.captures.length > 0
  //   ) {
  //     console.log("Attack or capture!!");
  //     // gotta pass only 0th index, dobattle does not take an array!
  //     //doBattle(attacksAndCaptures.attacks[0], currentCard, attacksAndCaptures.captures);
  //   }
  // }

  handlePlayCard(index, player, bxy, id) {
    //console.log('%c HandlePlayCard()', 'font-size: 16px; color: red');
    // collect array of all adjacent spaces
    let spaces = game.adjacentSpaces(bxy);

    console.log('Adjacent Spaces:');
    console.log(spaces);

    // filter enemy cards from adjacent spaces
    let enemies = game.getEnemyCards(
      spaces,
      this.state.board,
      player
    );

    console.log('Enemy Neighbors:');
    console.log(enemies);

    // create object contaning 1 array for all attacks, and 1 for all captures
    let attacksAndCaptures = game.determineAttacksAndCaptures(
      enemies,
      id
    );
    console.log('Attacks & Captures:');
    console.log(attacksAndCaptures);

    /////////
    ////// SetState Stuff
    /////////

    // create vars that will be used in object that will represent card, to be placed within board
    let pHand = player + 'hand';
    let { x, y } = bxy;
    let waitingToBeSelected = false;

    // create deep copied of both hand and board state so we can modify them
    // (without needing immutability-helper)

    // can use spread operator on 1d array to make deep copy
    let handClone = [...this.state[pHand]];
    handClone[index] = null;

    // need to use alternate deep copy method for 2d array
    let boardClone = JSON.parse(JSON.stringify(this.state.board));
    boardClone[x][y] = { id, player, x, y, waitingToBeSelected };

    /////////////
    /////////////
    ///// Battle Shit
    ////////////////
    ////////////////

    if (attacksAndCaptures.attacks.length === 1) {
      console.log(
        '%c in attack/capture === 1',
        'font-size: 15px; color: blue'
      );

      let enemyCard = attacksAndCaptures.attacks[0];

      // this is terrible, there has to be a better way
      let winResults = game.cardBattle(enemyCard, {
        x,
        y,
        id,
        player
      });
      console.log(
        '%c Results from win, and comparison of boardClone update:',
        'font-size: 20px; color: green'
      );
      console.log(winResults);

      console.log(boardClone[winResults.x][winResults.y]);
      boardClone[winResults.x][winResults.y] = {
        ...boardClone[winResults.x][winResults.y],
        x: winResults.x,
        y: winResults.y,
        player: winResults.player
      };
      console.log(boardClone[winResults.x][winResults.y]);
    }
    // if there are multiple cards to attack, the user must be prompted to select one of the cards
    else if (attacksAndCaptures.attacks.length >= 2) {
      // first, create array of coordinates (converted to string for simplicity of comparison later)
      // of all enemy cards
      let attacksCoords = attacksAndCaptures.attacks.map(
        att => att.x + '-' + att.y
      );
      // then double loop through,
      // return if card doesnt exist (space is null)
      // return if coordinate of double loop (represented by i + '-' + j, (converted to a string just like above))
      // does not also exist in array created above
      // else, we return the same object (by using the ...item operator)
      // then change just the necessary key value of 'waitingToBeSelected',
      // which will be used in the Card component to add a css class and click function
      boardClone = boardClone.map((arr, i) =>
        arr.map((item, j) => {
          if (!item) return item;
          if (!attacksCoords.includes(i + '-' + j)) return item;
          return { ...item, waitingToBeSelected: true };
        })
      );
    }

    // set state with the results of above
    this.setState({
      [pHand]: handClone,
      board: boardClone
    });

    console.log(
      '%c State was just set :D ',
      'font-size: 30px; color: purple'
    );

    // old setstate call using i-h
    // remove card from player hand
    //   [player + 'hand']: update(this.state[hand], {
    //     [index]: { $set: null }
    //   }),
    //   add new card to board
    //   board: update(this.state.board, {
    //     [x]: {
    //       [y]: { $set: { id, player, x, y, waitingToBeSelected } }
    //     }
    //   })
  }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate() within App.js');
  // }

  // function to pass down to Card if 'waitingToBeSelected' exists on object in board state
  selectCard(e) {
    //console.log('help me please');
    console.log(e.target);
  }

  render() {
    return (
      <div className="App">
        <h1>Tetra Master</h1>

        <div className="play-area">
          <CardHolder
            player="p1"
            hand={this.state.p1hand}
            onPlayCard={this.handlePlayCard}
          />
          <Board
            score={this.state.score}
            board={this.state.board}
            onSelectCard={this.selectCard}
          />
          <CardHolder
            player="p2"
            hand={this.state.p2hand}
            onPlayCard={this.handlePlayCard}
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
//export default App;
