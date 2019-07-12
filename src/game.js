import allCards from "./AllCards";

function adjacentSpaces(bxy) {
  // figure out all 8 adjacent possible squares
  // AND the direction that card would attack it from
  // (ex: the first object is top left = tl)

  // attackDir is from the perspective of the MOST RECENTLY PLAYED CARD
  // defendDir is from the perspective of the CARD THAT IS BEING ATTACKED
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

// getEnemyCards takes the coordinates / attackDir of the adjacent spaces,
// and creates an array of objects containing card information, including
// id, attackDir, and defendDir; all the info needed
// ONLY collects enemy cards
function getEnemyCards(adjSpaces, boardState, player) {
  let enemies = [];

  //
  adjSpaces.forEach(function(space) {
    let boardSpace = boardState[space.x][space.y];
    // collect card in adjacent space only if an enemy card
    if (boardSpace && boardSpace.player !== player) {
      let card = {
        x: space.x,
        y: space.y,
        id: boardSpace.id,
        attackDir: space.attackDir,
        defendDir: findOppositeDirection(space.attackDir)
      };
      enemies.push(card);
    }
  });

  return enemies;
} // end getEnemyCards

// determineAttacksAndCaptures takes enemy cards array and id of most recently played card,
// and creates two arrays: 1) all enemy cards where current Card and enemy card have
// numbers pointing at each other (they will do battle), and 2) all enemy cards
// that have no defence arrow against current cards attack arrow (will be captured)
function determineAttacksAndCaptures(enemies, id) {
  //utilize helper function to get Object of Numbers for most recently played card
  let currCardNums = getNumsFromID(id);

  // loops through enemy and player card's numbers to see if they will attack
  let validAttacks = enemies.filter(function(enemy) {
    let enemyNums = getNumsFromID(enemy.id);
    return (
      currCardNums[enemy.attackDir] != null &&
      enemyNums[enemy.defendDir] != null
    );
  });

  // same, but check if current card is pointing at a defenseless side of enemy card
  let validCaptures = enemies.filter(function(enemy) {
    let enemyNums = getNumsFromID(enemy.id);
    return (
      currCardNums[enemy.attackDir] != null &&
      enemyNums[enemy.defendDir] === null
    );
  });

  // return object containing each array
  return {
    attacks: validAttacks,
    captures: validCaptures
  };
} // end determineAttacksAndCaptures

// HELPER FUNCTIONS
///////////////////
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
