import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const targetSource = {
  drop(props, monitor) {
    // console.log(
    //   "%c DROPPED ON TARGET AT POSITION " + props.x + "-" + props.y,
    //   "font-size: 13px; color: purple"
    // );
    console.log(
      "%c What is in BoardSpace Props??",
      "font-size: 15px; color: yellow;"
    );
    console.log(props);

    // PREVENT dropping of cards in BoardSpaces that already have a card!
    //if (props.children) return false;

    return { x: props.x, y: props.y }; // this passed coords to the Card as monitor.getDropResult() in its endDrag method
  },
  hover(props) {
    // console.log("%c HOVERING", "font-size:15px; color: green");
    // console.log(props);
  },
  canDrop(props) {
    if (props.children) {
      return false;
    } else {
      return true;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

function BoardSpace(props) {
  const {
    connectDropTarget,
    hovered,
    item,
    dropped,
    x,
    y,
    children
  } = props;

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

export default DropTarget("card", targetSource, collect)(BoardSpace);
