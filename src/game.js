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
      attackDir: "ml"
    },
    {
      x: bxy.x,
      y: bxy.y + 1,
      attackDir: "mr"
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
export { adjacentSpaces };
