import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

const targetSource = {
   drop(props) {
      console.log("DROPPED ON TARGET");
   },
   hover(props) {
      console.log("HOVERING");
   }
}


function collect(connect, monitor) {
   return {
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem()
   }
}

class BoardSpace extends Component {
   render() {
      const { connectDropTarget, hovered, item } = this.props;
      return connectDropTarget(
         <div
            className="card-board-space"
            data-position={this.props.x + "-" + this.props.y}
         ></div>
      )
   }

}

export default DropTarget('card', targetSource, collect)(BoardSpace)
