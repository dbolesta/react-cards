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
      console.log("monitor here:");
      console.log(monitor.props);
      return props.handleDrop(props.cardData.owner);
   },
   canDrag(props) {
      if (props.inPlay) {
         return false
      } else {
         return true
      }
   }
}

function collect(connect, monitor) {
   return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
   }
}

class Card extends Component {
   render() {
      const { isDragging, connectDragSource } = this.props;
      const { numbers, title, owner } = this.props.cardData;


      const opacity = isDragging ? 0 : 1;
      // container for all arrow JSX
      const arrows = [];

      // loop through numbers object prop using Object.keys so we can get key / value
      Object.keys(numbers).map(function (keyName, keyIndex) {

         // if no number, return empty handed
         if (numbers[keyName] === null) return;

         // add the JSX using keyName for styling
         arrows.push(
            <span className={"arrow arrow-" + keyName} key={keyName}>
               <span>{numbers[keyName]}</span>
            </span>
         )

      })

      return connectDragSource(
         <div className={"card" + " card-" + owner} style={{ opacity }} title={title}>
            <div className="arrow-container">
               {arrows}
               <div className="card-color"></div>
            </div>
         </ div>
      )

   }
}

export default DragSource('card', itemSource, collect)(Card)
//export default Card
