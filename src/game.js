import allCards from "./AllCards";

function adjacentSpaces(player, bxy) {
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
      enemy.x >= 0 && enemy.x < 4 && (enemy.y >= 0 && enemy.y < 4)
  );

  return adjacentSpacesFilt;
}

// getCardNodes takes the coordinates of the valid spaces,
// and checks if there is a .card class living in it.
// if so, it pushes it into array, along with the attackDir string needed
// to keep track of the enemies relative position to the newly placed card
function getCardNodes(adjSpaces, id, boardState, bxy, player) {
  let nodes = [];

  console.log("inside getcardnodes");
  console.log("heres the stuff getting passed in");
  console.log(adjSpaces);
  console.log(id);
  console.log(
    "this one: " + boardState[adjSpaces[0].x][adjSpaces[0].y]
  );
  console.log(boardState[adjSpaces[0].x][adjSpaces[0].y]);
  console.log(bxy);
  console.log(player);

  // if the given space has a .card class, collect that node in array, with the associated direction of attack
  adjSpaces.forEach(function(space) {
    console.log("save me");
    console.log(boardState[space.x][space.y]);
    let boardSpace = boardState[space.x][space.y];
    if (boardSpace) {
      let card = {
        id: boardSpace.id,
        attackDir: space.attackDir
      };
      nodes.push(card);
    }
  });

  return nodes;
} // end getCardNodes

export { adjacentSpaces, getCardNodes };
