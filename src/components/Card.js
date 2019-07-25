import React, { useRef, useEffect } from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    console.log('Im draggin ma');
    console.log(props);
    return props;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const { onDrop, index } = props;
    const { owner, id } = props.cardData;

    return onDrop(
      index,
      owner,
      monitor.getDropResult(), // monitor.getDropResult is the object returned in the drop() method of BoardSpace
      id
    );
  },
  canDrag(props, monitor) {
    // used to disable dragging if card is on the Board ("inPlay")
    if (props.inPlay) {
      return false;
    } else {
      return true;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    //connectDragPreview: connect.dragPreview(), // dont think need?
    isDragging: monitor.isDragging()
  };
}

/// Card Component
//////////////////
function Card(props) {
  // destructure props
  const {
    isDragging,
    connectDragSource,
    waitingToBeSelected,
    position
  } = props;
  const { numbers, title, owner, id } = props.cardData;

  if (position) {
    console.log(
      '%c IM A CARD IN A BOARD...',
      'font-size:13px; color: red'
    );
    console.log(position, owner);
  }
  // function useTraceUpdate(props) {
  //   const prev = useRef(props);
  //   useEffect(() => {
  //     const changedProps = Object.entries(props).reduce(
  //       (ps, [k, v]) => {
  //         if (prev.current[k] !== v) {
  //           ps[k] = [prev.current[k], v];
  //         }
  //         return ps;
  //       },
  //       {}
  //     );
  //     if (Object.keys(changedProps).length > 0) {
  //       console.log(position, 'Changed props:', changedProps);
  //     }
  //     prev.current = props;
  //   });
  // }
  // useTraceUpdate(props);

  const opacity = isDragging ? 0 : 1;
  // container for all arrow JSX
  const arrows = [];

  // loop through numbers object prop using Object.keys so we can get key / value
  Object.keys(numbers).map(function(keyName, keyIndex) {
    // if no number, return empty handed
    if (numbers[keyName] === null) return;

    // add the JSX using keyName for styling
    arrows.push(
      <React.Fragment key={keyName}>
        <span className={'arrow arrow-' + keyName} key={keyName} />
        <span
          className={'arrow-num arrow-' + keyName + '-num'}
          key={keyName + '-num'}
        >
          {numbers[keyName]}
        </span>
      </React.Fragment>
    );
  });

  if (position) {
    console.log(
      '%c <Card> about to render',
      'font-size:14px; color: orange'
    );
  }

  return connectDragSource(
    <div
      onClick={props.onClickCard}
      className={
        'card card-' +
        owner +
        (waitingToBeSelected === true ? ' card-select' : '')
      }
      style={{ opacity }}
      data-title={title}
      data-position={position}
    >
      <div className="arrow-container">
        {arrows}
        <div className="card-color" />
      </div>
    </div>
  );
}

export default DragSource('card', itemSource, collect)(Card);
//export default Card
