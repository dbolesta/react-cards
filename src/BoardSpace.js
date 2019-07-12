import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const targetSource = {
  drop(props, monitor) {
    console.log(
      "DROPPED ON TARGET AT POSITION" + props.x + "-" + props.y
    );
    return { x: props.x, y: props.y }; // this passed coords to the Card as monitor.getDropResult() in its endDrag method
  },
  hover(props) {
    //console.log("HOVERING");
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

class BoardSpace extends Component {
  render() {
    const {
      connectDropTarget,
      hovered,
      item,
      dropped,
      x,
      y,
      children
    } = this.props;

    //console.log("Board Space Is being rendered " + x + y);
    const backgroundColor = hovered
      ? "rgba(255, 255, 255, 0.75)"
      : "transparent";
    if (hovered) {
      console.log("hovering over " + x + "-" + y);
    }

    return connectDropTarget(
      <div
        className="card-board-space"
        data-position={x + "-" + y}
        style={{ backgroundColor }}
      >
        {children}
      </div>
    );
  }
}

export default DropTarget("card", targetSource, collect)(BoardSpace);
