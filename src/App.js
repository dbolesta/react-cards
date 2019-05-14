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



// helper code used to create bunch of random fake card objects with fake data
// var faker = require('faker');

// let cardos = [];

// let cardId = 1;

// for (var j = 0; j < 69; j++) {

//   var numArray = [];
//   // loop through all number key values of newly created card
//   for (var i = 0; i < 8; i++) {
//     // random, 50/50 chance of getting a number
//     if (getRandomIntInclusive(0, 100) > 50) {
//       // number is randomly created
//       numArray[i] = getRandomIntInclusive(1, 10);
//     } else {
//       // otherwise, no number
//       numArray[i] = null;
//     }
//   } // end newCard.numbers

//   var photoId = getRandomIntInclusive(0, 1084);

//   var color = (getRandomIntInclusive(0, 100) > 50) ? "blue" : "red";

//   cardos.push({
//     id: cardId++,
//     owner: cardId % 2 == 0 ? "p1" : "p2",
//     name: faker.commerce.productName(),
//     type: faker.commerce.productMaterial(),
//     image: `https://picsum.photos/id/${photoId}/125`,
//     color: color,
//     rank: 2,
//     numbers: {
//       tl: numArray[0],
//       t: numArray[1],
//       tr: numArray[2],
//       ml: numArray[3],
//       mr: numArray[4],
//       bl: numArray[5],
//       b: numArray[6],
//       br: numArray[7]
//     }
//   })

// }
// console.log(cardos);

var tester = [];
for (var i = 0; i < 5; i++) {
  // fetch('https://source.unsplash.com/random')
  //   .then(response => response.json())
  //   .then(function (data) {
  //     console.log(data);
  //   });

  // fetch('https://source.unsplash.com/random')
  //   .then(function (response) {
  //     return response.json()
  //   })
  //   .then(function (res) {
  //     res.forEach(element => {
  //       tester.push(element);
  //     });
  //   })


}

fetch('https://source.unsplash.com/random')
  .then(function (response) {
    console.log("here is fetch");
    console.log(response.url);
  })

console.log(tester);

class App extends Component {

  state = {
    board: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
    p1hand: [
      null, null, null, null, null
    ],
    p2hand: [
      null, null, null, null, null
    ],
    score: {
      p1: 0,
      p2: 0
    }
  }

  render() {
    return (
      <div className="App" >

        <h1>Tetra Master</h1>

        <div className="play-area">

          <CardHolder player="p1" />
          <Board />
          <CardHolder player="p2" />

        </div>

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
