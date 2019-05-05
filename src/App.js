import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Card.css';



class Card extends React.Component {
  render() {



    return (
      <div class="card">
        <div class="arrow-container">
          <span class="arrow arrow-top-left">
            <span>10</span>
          </span>

          <span class="arrow arrow-top">
            <span>9</span>
          </span>

          <span class="arrow arrow-top-right">
            <span>8</span>
          </span>

          <span class="arrow arrow-left">
            <span>4</span>
          </span>

          <span class="arrow arrow-right">
            <span>4</span>
          </span>

          <span class="arrow arrow-bottom-left">
            <span>10</span>
          </span>

          <span class="arrow arrow-bottom">
            <span>10</span>
          </span>

          <span class="arrow arrow-bottom-right">
            <span>4</span>
          </span>

        </div>

      </div>
    )

  }
}


function App() {
  return (
    <div className="App">

      <Card />

    </div>
  );
}

export default App;
