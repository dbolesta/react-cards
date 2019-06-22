import React, { Component } from "react";
import logo from "./logo.svg";
import Card from "./Card";
import CardHolder from "./CardHolder";
import Board from "./Board";
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

  runAfterSetState(player, bxy, id) {
    console.log(
      "state has been updated, now run some code bro. Here is passed data"
    );
    let spaces = game.adjacentSpaces(player, bxy);
    console.log(game.adjacentSpaces(player, bxy));
    console.log("array of neighbor cards?????");
    console.log(
      game.getCardNodes(spaces, id, this.state.board, bxy, player)
    );
  }

  handlePlayCard(index, player, bxy, id) {
    console.log("State???");
    console.log(this.state[player + "hand"][index]);

    console.log(
      "...move card " + id + " to " + bxy.x + "-" + bxy.y + "???"
    );

    let hand = player + "hand";

    this.setState(
      {
        [player + "hand"]: update(this.state[hand], {
          [index]: { $set: null }
        }),
        board: update(this.state.board, {
          [bxy.x]: { [bxy.y]: { $set: { id, player } } }
        })
      },
      this.runAfterSetState(player, bxy, id) // setState callback
    );

    console.log("Now we need to do battle logic.");
    console.log(this.state.board);

    // this.setState({
    //   board: update(this.state.board, { [bxy.x]: { [bxy.y]: { $set: id } } })
    // })
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
