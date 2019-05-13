import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

const targetSource = {
   drop(props) {
      console.log("DROPPED ON TARGET AT POSITION" + props.x + "-" + props.y);
      blamBoi(props.x, props.y);
   },
   hover(props) {
      //console.log("HOVERING");
   }
}


function collect(connect, monitor) {
   return {
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem()
   }
}

function blamBoi(x, y) {
   console.log("YA BOY GOTTA BLAM ON " + x + y);
}

class BoardSpace extends Component {
   render() {
      const { connectDropTarget, hovered, item, dropped, x, y } = this.props;

      const backgroundColor = hovered ? "rgba(255, 255, 255, 0.75)" : "transparent";
      if (hovered) {
         console.log("hovering over " + x + "-" + y);
      }

      return connectDropTarget(
         <div
            className="card-board-space"
            data-position={x + "-" + y}
            style={{ backgroundColor }}
         ></div>
      )
   }

}

export default DropTarget('card', targetSource, collect)(BoardSpace)
