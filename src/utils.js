import allCards from './AllCards'

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomCard() {
   return allCards[getRandomIntInclusive(0, allCards.length - 1)];
}


function getCardById(id) {
   return allCards.find(card => card.id === id);
}

function getUniqueRandomArray(length) {
   let arr = [];
   while (arr.length < length + 1) {
      let r = getRandomIntInclusive(1, 69);
      if (arr.indexOf(r) === -1) arr.push(r);
   }

   return arr;

   // let halfWayThough = Math.floor(arr.length / 2)

   // let arrayFirstHalf = arr.slice(0, halfWayThough);
   // let arraySecondHalf = arr.slice(halfWayThough, arr.length);


   // return [arrayFirstHalf, arraySecondHalf];
}



export { getRandomIntInclusive, getRandomCard, getCardById, getUniqueRandomArray };


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