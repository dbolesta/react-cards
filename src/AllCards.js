let firstCard = {
   id: 1,
   owner: "p1",
   name: "Paper Clip",
   type: undefined,
   image: "https://picsum.photos/125",
   color: "blue",
   rank: 2,
   numbers: {
      tl: 1,
      t: 2,
      tr: 3,
      ml: 4,
      mr: 5,
      bl: 6,
      b: 7,
      br: 8
   }
}

let secondCard = {
   id: 2,
   owner: "p2",
   name: "Grasshopper",
   type: undefined,
   image: "https://picsum.photos/125",
   color: "red",
   rank: 1,
   numbers: {
      tl: 3,
      t: 1,
      tr: null,
      ml: null,
      mr: 5,
      bl: null,
      b: 7,
      br: 8
   }
}

const allCards = [firstCard, secondCard];

export default allCards;