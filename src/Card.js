import React, { Component } from 'react'
import { DragSource } from 'react-dnd'


const itemSource = {
   beginDrag(props) {
      console.log("Im draggin ma");
      return props;
   },
   endDrag(props, monitor, component) {
      if (!monitor.didDrop()) {
         return;
      }
      return props.handleDrop(props.id);
   }
}

function collect(connect, monitor) {
   return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
   }
}

class Card extends Component {
   render() {
      const { isDragging, connectDragSource, src, key, numbers } = this.props;

      // container for all arrow JSX
      const arrows = [];

      // loop through numbers object prop using Object.keys so we can get key / value
      Object.keys(numbers).map(function (keyName, keyIndex) {

         // if no number, return empty handed
         if (numbers[keyName] === null) return;

         // add the JSX using keyName for styling
         arrows.push(
            <span className={"arrow arrow-" + keyName}>
               <span>{numbers[keyName]}</span>
            </span>
         )

      })

      return connectDragSource(
         <div className="card">
            <div className="arrow-container">
               {arrows}
            </div>
         </div>
      )

   }
}

export default DragSource('card', itemSource, collect)(Card)
//export default Card
