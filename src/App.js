import React, { Component } from "react";
import Card from "./components/Card";
import CardHolder from "./components/CardHolder";
import Board from "./components/Board";
import "./App.css";
import "./Card.css";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import allCards from "./AllCards";
import update from "immutability-helper";
import * as utils from "./utils";
import * as game from "./game";

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
      }
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
    // console.log("State???");
    // console.log(this.state[player + "hand"][index]);

    // console.log(
    //   "...move card " + id + " to " + bxy.x + "-" + bxy.y + "???"
    // );

    console.log("HANDLEPLAYCARD IS BEING CALLED!!!!!!!");

    let hand = player + "hand";
    let x = bxy.x;
    let y = bxy.y;

    this.setState({
      // remove card from player hand
      [player + "hand"]: update(this.state[hand], {
        [index]: { $set: null }
      }),
      // add new card to board
      board: update(this.state.board, {
        [bxy.x]: { [bxy.y]: { $set: { id, player, x, y } } }
      })
    });
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
          <Board score={this.state.score} board={this.state.board} />
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
