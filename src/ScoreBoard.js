import React, { Component } from 'react'

export class ScoreBoard extends Component {
   render() {
      return (
         <div>
            {this.props.score.p1}|{this.props.score.p2}
            <br />
            <br />
         </div>
      )
   }
}

export default ScoreBoard
