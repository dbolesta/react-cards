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



const gman = utils.getUniqueRandomArray(10);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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





  render() {
    return (
      <div className="App" >

        <h1>Tetra Master</h1>

        <div className="play-area">

          <CardHolder
            player="p1"
            hand={this.state.p1hand}
          />
          <Board
            score={this.state.score}
          />
          <CardHolder
            player="p2"
            hand={this.state.p2hand}
          />

        </div>

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
