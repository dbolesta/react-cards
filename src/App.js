import React from 'react';
import logo from './logo.svg';
import Card from './Card'
import Board from './Board';
import './App.css';
import './Card.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import allCards from './AllCards'




class CardHolder extends React.Component {


  deleteItem = (id) => {
    // this.setState(prevState => {
    //   let items = prevState.items;
    //   const index = items.findIndex(item => item.id === id);

    //   items.splice(index, 1);

    //   return { items };
    // });
    console.log(id);
  }



  render() {


    const slots = [];

    const holderStyle = {
      border: "1px solid black"
    }

    const slotStyle = {
      border: "1px solid black"
    }

    for (let i = 1; i < 6; i++) {
      slots.push(
        <div className="cardSlot" style={slotStyle} key={i}>
          <Card
            id={i}
            handleDrop={(id) =>
              this.deleteItem(id)
            }
            numbers={allCards[1].numbers}
          />
        </div>
      )
    }


    return (
      <div className="cardHolder" style={holderStyle}>
        {slots}
      </div>

    )
  }
}






function App() {
  return (
    <div className="App">
      <div className="play-area">

        <CardHolder />
        <Board />
        <CardHolder />

      </div>

    </div>
  );
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
