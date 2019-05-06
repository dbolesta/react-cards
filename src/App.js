import React from 'react';
import logo from './logo.svg';
import Card from './Card'
import './App.css';
import './Card.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


class CardHolder extends React.Component {
  render() {


    const slots = [];

    const slotStyle = {
      border: "1px solid black",
      padding: "10px"
    }

    for (let i = 1; i < 6; i++) {
      slots.push(
        <div className="cardSlot" style={slotStyle} key={i}>
          <Card />
        </div>
      )
    }


    return (
      <div className="cardHolder">
        {slots}
      </div>

    )
  }
}



function App() {
  return (
    <div className="App">

      <CardHolder />

    </div>
  );
}

export default DragDropContext(HTML5Backend)(App)
//export default App;
