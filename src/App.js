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
import * as utils from './utils'

console.log("Getting card id testing");
console.log(utils.getCardById(1));
console.log(utils.getCardById(10));
console.log(utils.getCardById(23));
console.log(utils.getCardById(8));
console.log(utils.getCardById(69));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null, null],
        [null, 2, null, null],
        [null, null, null, null],
        [null, null, 69, null]
      ],
      p1hand: [
        null, null, null, null, null
      ],
      p2hand: [
        null, null, null, null, null
      ],
      score: {
        p1: 9,
        p2: 123
      }
    }
  }


  render() {
    return (
      <div className="App" >

        <h1>Tetra Master</h1>

        <div className="play-area">

          <CardHolder player="p1" />
          <Board
            score={this.state.score}
            board={this.state.board}
          />
          <CardHolder player="p2" />

        </div>

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
