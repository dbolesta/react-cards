import React, { Component } from 'react'
import { DragSource } from 'react-dnd'


const itemSource = {
   beginDrag(props) {
      console.log("Im draggin ma");
      return props.item;
   },
   endDrag(props, monitor, component) {
      if (!monitor.didDrop()) {
         return;
      }
      return props.handleDrop(props.item.id);
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

      const { isDragging, connectDragSource, src } = this.props;

      return connectDragSource(
         <div className="card">
            <div className="arrow-container">
               <span className="arrow arrow-top-left">
                  <span>10</span>
               </span>

               <span className="arrow arrow-top">
                  <span>9</span>
               </span>

               <span className="arrow arrow-top-right">
                  <span>8</span>
               </span>

               <span className="arrow arrow-left">
                  <span>4</span>
               </span>

               <span className="arrow arrow-right">
                  <span>4</span>
               </span>

               <span className="arrow arrow-bottom-left">
                  <span>10</span>
               </span>

               <span className="arrow arrow-bottom">
                  <span>10</span>
               </span>

               <span className="arrow arrow-bottom-right">
                  <span>4</span>
               </span>

            </div>

         </div>
      )

   }
}

export default DragSource('card', itemSource, collect)(Card)
//export default Card
