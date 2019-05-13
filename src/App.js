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



class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="play-area">

          <CardHolder />
          <Board />
          <CardHolder />

        </div>

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
