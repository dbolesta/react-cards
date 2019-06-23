import allCards from "./AllCards";

function adjacentSpaces(bxy) {
  // figure out all 8 adjacent possible squares
  // AND the direction that card would attack it from
  // (ex: the first object is top left = tl)
  var theEight = [
    {
      x: bxy.x - 1,
      y: bxy.y - 1,
      attackDir: "tl"
    },
    {
      x: bxy.x - 1,
      y: bxy.y,
      attackDir: "t"
    },
    {
      x: bxy.x - 1,
      y: bxy.y + 1,
      attackDir: "tr"
    },
    {
      x: bxy.x,
      y: bxy.y - 1,
      attackDir: "l"
    },
    {
      x: bxy.x,
      y: bxy.y + 1,
      attackDir: "r"
    },
    {
      x: bxy.x + 1,
      y: bxy.y - 1,
      attackDir: "bl"
    },
    {
      x: bxy.x + 1,
      y: bxy.y,
      attackDir: "b"
    },
    {
      x: bxy.x + 1,
      y: bxy.y + 1,
      attackDir: "br"
    }
  ];

  // filter out spaces that dont exist
  let adjacentSpacesFilt = theEight.filter(
    enemy =>
      enemy.x >= 0 && enemy.x < 4 && enemy.y >= 0 && enemy.y < 4
  );

  return adjacentSpacesFilt;
}

// getEnemyCards takes the coordinates of the valid spaces,
// and checks if there is a .card class living in it.
// if so, it pushes it into array, along with the attackDir string needed
// to keep track of the enemies relative position to the newly placed card
function getEnemyCards(adjSpaces, id, boardState, bxy, player) {
  let enemies = [];

  //   console.log("inside getEnemyCards");
  //   console.log("heres the stuff getting passed in");
  //   console.log(adjSpaces);
  //   console.log(id);
  //   console.log(
  //     "this one: " + boardState[adjSpaces[0].x][adjSpaces[0].y]
  //   );
  //   console.log(boardState[adjSpaces[0].x][adjSpaces[0].y]);
  //   console.log(bxy);
  //   console.log(player);

  // if the given space has a .card class, collect that node in array, with the associated direction of attack
  adjSpaces.forEach(function(space) {
    let boardSpace = boardState[space.x][space.y];
    // collect card in adjacent space only if an enemy card
    if (boardSpace && boardSpace.player !== player) {
      let card = {
        id: boardSpace.id,
        attackDir: space.attackDir,
        defendDir: findOppositeDirection(space.attackDir)
      };
      enemies.push(card);
    }
  });

  return enemies;
} // end getEnemyCards

// determineAttacksAndCaptures takes enemy cards array and current card,
// and creates two arrays: 1) all enemy cards where current Card and enemy card have
// numbers pointing at each other (they will do battle), and 2) all enemy cards
// that have no defence arrow against current cards attack arrow (will be captured)
function determineAttacksAndCaptures(enemies, id) {
  //   var validAttacks = enemies.filter(function(enemy) {
  //     return (
  //       currCardObj.numbers[enemy.attackDir] != null &&
  //       enemy.obj.numbers[enemy.defendDir] != null
  //     );
  //   });

  //   var validCaptures = enemies.filter(function(enemy) {
  //     return (
  //       currCardObj.numbers[enemy.attackDir] != null &&
  //       enemy.obj.numbers[enemy.defendDir] === null
  //     );
  //   });

  //   return {
  //     attacks: validAttacks,
  //     captures: validCaptures
  //   };

  let currCardNums = getNumsFromID(id);
  let validAttacks = enemies.filter(function(enemy) {
    let enemyNums = getNumsFromID(enemy.id);
    return (
      currCardNums[enemy.attackDir] != null &&
      enemyNums[enemy.defendDir] != null
    );
  });

  let validCaptures = enemies.filter(function(enemy) {
    let enemyNums = getNumsFromID(enemy.id);
    return (
      currCardNums[enemy.attackDir] != null &&
      enemyNums[enemy.defendDir] === null
    );
  });

  return {
    attacks: validAttacks,
    captures: validCaptures
  };

  console.log("Inside get attacks and captures");
  console.log(enemies);
  console.log(id);

  console.log("VALID ATTACKERS?????");
  console.log(validAttacks);
} // end determineAttacksAndCaptures

// HELPER FUNCTIONS
function findOppositeDirection(dir) {
  let oppositeDir;

  if (dir === "tl") {
    oppositeDir = "br";
  } else if (dir === "t") {
    oppositeDir = "b";
  } else if (dir === "tr") {
    oppositeDir = "bl";
  } else if (dir === "l") {
    oppositeDir = "r";
  } else if (dir === "r") {
    oppositeDir = "l";
  } else if (dir === "bl") {
    oppositeDir = "tr";
  } else if (dir === "b") {
    oppositeDir = "t";
  } else if (dir === "br") {
    oppositeDir = "tl";
  }

  return oppositeDir;
}

function getNumsFromID(id) {
  let index = allCards.findIndex(card => card.id === id);
  return allCards[index].numbers;
}

export { adjacentSpaces, getEnemyCards, determineAttacksAndCaptures };
