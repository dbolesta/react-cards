import React, { Component } from 'react';
import logo from './logo.svg';
import Card from './Card'
import CardHolder from './CardHolder'
import Board from './Board';
import './App.css';
import './Card.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import allCards from './AllCards'
import update from 'immutability-helper';
import * as utils from './utils'



const gman = utils.getUniqueRandomArray(10);


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
        gman[0], gman[1], gman[2], gman[3], gman[4]
      ],
      p2hand: [
        gman[6], gman[7], gman[8], gman[9], gman[10]
      ],
      score: {
        p1: 9,
        p2: 123
      }
    }
  }


  handlePlayCard(index, player, bxy, id) {
    console.log("State???");
    console.log(this.state[player + "hand"][index])

    console.log("...move card " + id + " to " + bxy.x + "-" + bxy.y + "???");

    let hand = player + "hand";

    this.setState({
      [player + "hand"]: update(this.state[hand], { [index]: { $set: null } }),
      board: update(this.state.board, { [bxy.x]: { [bxy.y]: { $set: id } } })
    })

    // this.setState({
    //   board: update(this.state.board, { [bxy.x]: { [bxy.y]: { $set: id } } })
    // })

  }


  render() {
    return (
      <div className="App" >

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

export default DragDropContext(HTML5Backend)(App)
//export default App;
